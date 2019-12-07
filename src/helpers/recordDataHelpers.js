import Immutable from 'immutable';
import get from 'lodash/get';

import {
  ERR_DATA_TYPE,
  ERR_MISSING_REQ_FIELD,
  ERR_UNABLE_TO_VALIDATE,
} from '../constants/errorCodes';

import {
  configKey,
  getDefaults,
  getDefaultValue,
  getFieldComputer,
  getFieldCustomValidator,
  getFieldDataType,
  getRequiredMessage,
  isFieldCloneable,
  isFieldRepeating,
  isFieldRequired,
  getStickyFields,
} from './configHelpers';

import {
  isCsid,
} from './csidHelpers';

import {
  findBroaderRelation,
  placeholderCsid,
} from './relationListHelpers';

import {
  isDeprecated,
  isLocked,
  isReplicated,
} from './workflowStateHelpers';

const numericPattern = /^[0-9]$/;

export const NS_PREFIX = 'ns2';
export const DOCUMENT_PROPERTY_NAME = 'document';
export const ERROR_KEY = '[error]';

export const getPartPropertyName = partName =>
  `${NS_PREFIX}:${partName}`;

export const getPart = (data, partName) =>
  data.getIn([DOCUMENT_PROPERTY_NAME, getPartPropertyName(partName)]);

export const getPartNSPropertyName = prefix =>
  `@xmlns:${prefix}`;

/**
 * Deeply get a value in an Immutable.Map. This is similar to Immutable.Map.getIn, but differs in
 * one way:
 *
 * When a key of '0' is encountered, and that key is used to index a data item that is not a List,
 * the data item itself is returned. This accommodates data in which a list containing a single
 * item may be represented by that one item.
 */
export const deepGet = (data, path) => {
  if (!Array.isArray(path) || path.length === 0) {
    throw new Error('path must be a non-empty array');
  }

  if (!data) {
    return undefined;
  }

  const [key, ...rest] = path;

  let value;

  if ((key === '0' || key === 0) && !Immutable.List.isList(data)) {
    // Allow a key of 0 to refer to a single non-list value.
    value = data;
  } else {
    value = data.get(key);
  }

  if (!value || rest.length === 0) {
    return value;
  }

  return deepGet(value, rest);
};

/**
 * Deeply set a value in an Immutable.Map. This is similar to Immutable.Map.setIn, but differs in
 * two ways:
 *
 * When a non-existent key is encountered in the middle of a path, this function may create a List
 * or a Map at that location, depending on the key. If the key is a numeric string, a List is
 * created. Otherwise, a Map is created. Immutable.Map.setIn always creates a Map.
 *
 * This function also promotes an existing singular (non-List) item to a List, if any numeric key
 * is applied to it.
 */
export const deepSet = (data, path, value) => {
  if (!Array.isArray(path) || path.length === 0) {
    throw new Error('path must be a non-empty array');
  }

  const [key, ...rest] = path;
  const isKeyNumeric = numericPattern.test(key);

  let normalizedData;

  if (data) {
    if (isKeyNumeric && !Immutable.List.isList(data)) {
      // Promote a single (non-list) value into a list when a numeric key is supplied.
      normalizedData = Immutable.List.of(data);
    } else {
      normalizedData = data;
    }
  } else if (isKeyNumeric) {
    normalizedData = Immutable.List();
  } else {
    normalizedData = Immutable.Map();
  }

  const resolvedValue = (rest.length === 0) ? value : deepSet(normalizedData.get(key), rest, value);

  return normalizedData.set(key, resolvedValue);
};

/**
 * Deeply delete a value in an Immutable.Map. This is similar to Immutable.Map.deleteIn, but differs
 * in two ways:
 *
 * When a non-existent key is encountered in the middle of a path, this function may create a List
 * or a Map at that location, depending on the key. If the key is a numeric string, a List is
 * created. Otherwise, a Map is created. Immutable.Map.deleteIn makes no change when a key in the
 * path does not exist.
 *
 * This function also promotes an existing singular (non-List) item to a List, if any numeric key
 * is applied to it.
 */
export const deepDelete = (data, path) =>
  // First call deepSet with undefined value to ensure the path exists. Then call deleteIn.
  deepSet(data, path).deleteIn(path);

export const normalizeFieldValue = (fieldDescriptor, fieldValue, expandRepeating = true) => {
  let normalizedValue = fieldValue;

  if (fieldDescriptor && typeof fieldValue !== 'undefined') {
    if (Immutable.Map.isMap(normalizedValue)) {
      normalizedValue = normalizedValue.map(
        (childValue, childName) => normalizeFieldValue(fieldDescriptor[childName], childValue)
      );
    } else if (Immutable.List.isList(normalizedValue)) {
      normalizedValue = normalizedValue.map(
        instance => normalizeFieldValue(fieldDescriptor, instance, false)
      );
    }

    if (
      expandRepeating &&
      isFieldRepeating(fieldDescriptor) &&
      !Immutable.List.isList(normalizedValue)
    ) {
      normalizedValue = Immutable.List.of(normalizedValue);
    }
  }

  return normalizedValue;
};

export const normalizeRecordData = (recordTypeConfig, data) => {
  let normalizedData = normalizeFieldValue(recordTypeConfig.fields, data);

  if (recordTypeConfig.normalizeRecordData) {
    normalizedData = recordTypeConfig.normalizeRecordData(data, recordTypeConfig);
  }

  return normalizedData;
};

/**
 * Create a blank data record for a given CollectionSpace record type.
 */
export const createBlankRecord = (recordTypeConfig) => {
  const {
    fields,
  } = recordTypeConfig;

  const documentKey = (Object.keys(fields))[0];
  const documentDescriptor = fields[documentKey];
  const document = {};

  // On some records, e.g. roles, the document has a namespace.

  const documentNsUri = get(documentDescriptor, [configKey, 'service', 'ns']);

  if (documentNsUri) {
    const nsPrefix = documentKey.split(':', 2)[0];

    document[getPartNSPropertyName(nsPrefix)] = documentNsUri;
  }

  // Most records have parts with a namespace.

  const partKeys = Object.keys(documentDescriptor);

  partKeys.forEach((partKey) => {
    const partDescriptor = documentDescriptor[partKey];
    const nsUri = get(partDescriptor, [configKey, 'service', 'ns']);

    if (nsUri) {
      const nsPrefix = partKey.split(':', 2)[0];

      document[partKey] = {
        [getPartNSPropertyName(nsPrefix)]: nsUri,
      };
    }
  });

  return Immutable.fromJS({
    [documentKey]: document,
  });
};

/**
 * Deeply copy the value at a given path in a source record into a destination record.
 */
export const copyValue = (fieldDescriptorPath, sourceData, destData) => {
  if (
    !fieldDescriptorPath ||
    fieldDescriptorPath.length === 0 ||
    !Immutable.Map.isMap(sourceData)
  ) {
    return sourceData;
  }

  const [key, ...rest] = fieldDescriptorPath;
  const sourceChild = sourceData.get(key);

  let destChild = destData.get(key);

  if (!Immutable.Map.isMap(destChild)) {
    destChild = Immutable.Map();
  }

  if (Immutable.List.isList(sourceChild)) {
    return (
      sourceChild.reduce((updatedDestData, instance, index) =>
        updatedDestData.setIn([key, index], copyValue(rest, instance, destChild)),
        destData.set(key, Immutable.List())
      )
    );
  }

  return destData.set(key, copyValue(rest, sourceChild, destChild));
};

/**
 * Set a default value into record data. When declared on a repeating field, a default value will
 * be set on all instances of that field existing in the record data. If a repeating field has no
 * instances, a single instance will be created.
 */
export const spreadDefaultValue = (value, fieldDescriptorPath, data) => {
  if (!fieldDescriptorPath || fieldDescriptorPath.length === 0) {
    return (typeof data === 'undefined' ? value : data);
  }

  let map;

  if (typeof data === 'undefined') {
    map = Immutable.Map();
  } else if (Immutable.Map.isMap(data)) {
    map = data;
  } else {
    return data;
  }

  const [key, ...rest] = fieldDescriptorPath;
  const child = map.get(key);

  if (Immutable.List.isList(child)) {
    return (
      child.reduce((updatedData, instance, index) =>
        updatedData.setIn([key, index], spreadDefaultValue(value, rest, instance)), map)
    );
  }

  return map.set(key, spreadDefaultValue(value, rest, child));
};

/**
 * Set default values in record data.
 */
export const applyDefaults = (fieldDescriptor, data) =>
  getDefaults(fieldDescriptor).reduce((updatedData, defaultDescriptor) =>
    spreadDefaultValue(defaultDescriptor.value, defaultDescriptor.path, updatedData), data);

/**
 * Initialize the child fields of a complex field.
 */
export const initializeChildren = (fieldDescriptor, data, value = null) => {
  const childKeys = Object.keys(fieldDescriptor).filter(key => key !== configKey);

  if (childKeys.length === 0) {
    return data;
  }

  const map = data || Immutable.Map();

  return childKeys.reduce((updatedMap, key) => (
    (typeof updatedMap.get(key) === 'undefined') ? updatedMap.set(key, value) : updatedMap
  ), map);
};

/**
 * Create a skeletal data record for a given CollectionSpace service.
 */
export const createRecordData = recordTypeConfig =>
  applyDefaults(recordTypeConfig.fields, createBlankRecord(recordTypeConfig));

/**
 * Clear uncloneable fields from record data. Existing (not undefined) values in fields that are
 * not cloneable are set to the default value if one exists, or undefined otherwise.
 */
export const clearUncloneable = (fieldDescriptor, data) => {
  if (!fieldDescriptor) {
    return data;
  }

  if (typeof data !== 'undefined' && !isFieldCloneable(fieldDescriptor)) {
    // If the field has been configured as not cloneable and there is an existing value, replace
    // the existing value with the default value if there is one, or undefined otherwise. The old
    // UI did not set uncloneable fields to the default value, but I think this was an oversight.

    return (
      Immutable.Map.isMap(data)
        ? applyDefaults(fieldDescriptor)
        : getDefaultValue(fieldDescriptor)
    );
  }

  if (Immutable.Map.isMap(data)) {
    return data.reduce((updatedData, child, name) =>
      updatedData.set(name, clearUncloneable(fieldDescriptor[name], child)), data);
  }

  if (Immutable.List.isList(data)) {
    return data.reduce((updatedData, child, index) =>
      updatedData.set(index, clearUncloneable(fieldDescriptor, child)), data);
  }

  return data;
};

export const prepareClonedHierarchy = (fromCsid, data) => {
  // Process hierarchy following a clone. Delete children, and use the new record placeholder
  // csid in relations to parents.
  // TODO: Move this into config?

  let relations = data.getIn(['document', 'rel:relations-common-list', 'relation-list-item']);
  const updatedData = data.deleteIn(['document', 'rel:relations-common-list']);

  if (!relations) {
    return updatedData;
  }

  if (!Immutable.List.isList(relations)) {
    relations = Immutable.List.of(relations);
  }

  const broaderRelation = findBroaderRelation(fromCsid, relations);

  if (!broaderRelation) {
    return updatedData;
  }

  return updatedData.setIn(['document', 'rel:relations-common-list', 'relation-list-item'],
    Immutable.List.of(broaderRelation.setIn(['subject', 'csid'], placeholderCsid))
  );
};

/**
 * Create a new record as a clone of a given record.
 */
export const cloneRecordData = (recordTypeConfig, csid, data) => {
  if (!data) {
    return data;
  }

  let clone = data;

  // Delete parts that should not exist in new records.

  clone = clone.deleteIn(['document', `${NS_PREFIX}:collectionspace_core`]);
  clone = clone.deleteIn(['document', `${NS_PREFIX}:account_permission`]);

  // Reset fields that are configured as not cloneable.

  clone = clearUncloneable(recordTypeConfig.fields, clone);
  clone = prepareClonedHierarchy(csid, clone);

  return clone;
};

/**
 * Get the document from the data record.
 */
export const getDocument = data =>
  data.get(DOCUMENT_PROPERTY_NAME);

/**
 * Comparator function to sort properties that represent XML attributes and namespace declarations
 * (those that start with '@') to the top.
 */
export const attributePropertiesToTop = (propertyNameA, propertyNameB) => {
  const firstCharA = propertyNameA.charAt(0);
  const firstCharB = propertyNameB.charAt(0);

  if (firstCharA === firstCharB) {
    return 0;
  }

  if (firstCharA === '@') {
    return -1;
  }

  if (firstCharB === '@') {
    return 1;
  }

  return 0;
};

/**
 * Set the XML namespace property on a document part if it is not set, using the URI defined in the
 * field configuration. This is used in the rare case that a record retrieved from the REST API did
 * not contain one of its expected parts; for example, when a schema extension is added to a record
 * type, the new part will not appear on existing records. If a field in that part was set through
 * the UI, the part will have been created, but without the namespace attribute, which is normally
 * created through the createBlankRecord function. That function would not have been called,
 * because this was not a new record. This function can be used before saving a record to ensure
 * that any missing namespace attributes get filled in.
 */
export const setXmlNamespaceAttribute = (partData, partName, partDescriptor) => {
  const nsUri = get(partDescriptor, [configKey, 'service', 'ns']);
  const [prefix] = partName.split(':', 1);

  if (prefix && nsUri) {
    const data = Immutable.Map.isMap(partData) ? partData : Immutable.Map();

    if (!data.get(`@xmlns:${prefix}`)) {
      return data.set(`@xmlns:${prefix}`, nsUri);
    }
  }

  return partData;
};

/**
 * Prepare record data for POST or PUT to the CollectionSpace REST API:
 *
 * - Document parts that may be present in data retrieved from the REST API, but that should not be
 *   present in data sent to the API, are removed.
 * - In the remaining parts, properties beginning with '@', which represent XML attributes and
 *   namespace declarations, are moved to the top. This is required by the REST API in order to
 *   properly translate the payload to XML.
 */
export const prepareForSending = (data, recordTypeConfig) => {
  let preparedData = data;

  // Execute the prepareForSending function configured for the record type, if any.

  const customPrepareForSending = recordTypeConfig.prepareForSending;

  if (typeof customPrepareForSending === 'function') {
    preparedData = customPrepareForSending(preparedData, recordTypeConfig);
  }

  const documentName = preparedData.keySeq().first();

  let cspaceDocument = preparedData.get(documentName);

  // Filter out parts that don't need to be sent.
  // TODO: Use field configuration to determine what should be removed.

  cspaceDocument = cspaceDocument.filter((value, key) => (
    key !== `${NS_PREFIX}:collectionspace_core`
    && key !== `${NS_PREFIX}:account_permission`
    && key !== `${NS_PREFIX}:image_metadata`
  ));

  // Move XML attribute and namespace declaration properties (those that start with @) to the top,
  // since the REST API requires this.

  cspaceDocument = cspaceDocument.sortBy((value, name) => name, attributePropertiesToTop);

  // For each part, ensure XML namespace declaration properties are set, and move XML attribute and
  // namespace declaration properties to the top.

  if (documentName === 'document') {
    for (const key of cspaceDocument.keys()) {
      if (key.charAt(0) !== '@') {
        let part = cspaceDocument.get(key);

        part = setXmlNamespaceAttribute(part, key, get(recordTypeConfig, ['fields', documentName, key]));

        if (Immutable.Map.isMap(part)) {
          part = part.sortBy((value, name) => name, attributePropertiesToTop);
        }

        cspaceDocument = cspaceDocument.set(key, part);
      }
    }
  }

  // Filter out hierarchy relations that don't have both a subject and an object, since the REST
  // API will error. These will occur when hierarchy autocomplete fields are emptied, or new
  // child instances are created but not filled in.

  // TODO: Move this to a computation in the HierarchyInput.

  const relations = cspaceDocument.getIn(['rel:relations-common-list', 'relation-list-item']);

  if (relations && Immutable.List.isList(relations)) {
    const filteredRelations = relations.filter(relation => (
      (relation.getIn(['object', 'refName']) || relation.getIn(['object', 'csid'])) &&
      (relation.getIn(['subject', 'refName']) || relation.getIn(['subject', 'csid']))
    ));

    cspaceDocument = cspaceDocument.setIn(
      ['rel:relations-common-list', 'relation-list-item'], filteredRelations
    );
  }

  preparedData = preparedData.set(documentName, cspaceDocument);

  // Set to null any subrecord csid fields that don't contain valid csids -- these are pointing to
  // new subrecords that haven't been saved.

  const { subrecords } = recordTypeConfig;

  if (subrecords) {
    Object.values(subrecords).forEach((subrecordConfig) => {
      const { csidField } = subrecordConfig;

      if (csidField) {
        const subrecordCsid = deepGet(preparedData, csidField);

        if (!isCsid(subrecordCsid)) {
          preparedData = deepSet(preparedData, csidField, null);
        }
      }
    });
  }

  return preparedData;
};

export const getCoreFieldValue = (data, fieldName) => {
  if (data) {
    const corePart = getPart(data, 'collectionspace_core');

    if (corePart) {
      return corePart.get(fieldName);
    }
  }

  return undefined;
};

export const getCommonFieldValue = (data, fieldName) => {
  if (!data) {
    return undefined;
  }

  const document = data.get('document');

  if (!document) {
    return undefined;
  }

  const partName = document.keySeq().find(key => key.endsWith('_common'));
  const commonPart = document.get(partName);

  return commonPart.get(fieldName);
};

export const getCsid = (data) => {
  if (!data) {
    return undefined;
  }

  const uri = data.getIn(['document', 'ns2:collectionspace_core', 'uri']);

  return (uri ? uri.substring(uri.lastIndexOf('/') + 1) : undefined);
};

export const getRefName = (data) => {
  if (!data) {
    return undefined;
  }

  return data.getIn(['document', 'ns2:collectionspace_core', 'refName']);
};

export const getUpdatedTimestamp = (data) => {
  let updatedAt = getCoreFieldValue(data, 'updatedAt');

  if (!updatedAt && data) {
    // Weird records like roles have updatedAt as a child of the root node.

    const doc = data.first();

    if (doc) {
      updatedAt = doc.get('updatedAt');
    }
  }

  return updatedAt;
};

export const getUpdatedUser = data =>
  getCoreFieldValue(data, 'updatedBy');

export const getCreatedTimestamp = (data) => {
  let createdAt = getCoreFieldValue(data, 'createdAt');

  if (!createdAt) {
    // Weird records like roles have updatedAt as a child of the root node.

    const doc = data.first();

    if (doc) {
      createdAt = doc.get('createdAt');
    }
  }

  return createdAt;
};

export const getCreatedUser = data =>
  getCoreFieldValue(data, 'createdBy');

const intPattern = /^-?\d+$/;
const floatPattern = /^-?(\d+(\.\d+)?|\.\d+)$/;
const dateTimePattern = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?Z)?$/;
// The pre-5.0 UI allowed non-zero times on date-typed fields, and the REST API still allows it,
// so there may be data that contains non-zero times. This means the UI needs to support that,
// even if the calendar picker always generates dates without times.
// const datePattern = /^\d{4}-\d{2}-\d{2}(T00:00:00.000Z)?$/;
const datePattern = dateTimePattern;

const dataTypeValidators = {
  DATA_TYPE_MAP: value => Immutable.Map.isMap(value),
  DATA_TYPE_STRING: () => true,
  DATA_TYPE_INT: value => intPattern.test(value),
  DATA_TYPE_FLOAT: value => floatPattern.test(value),
  DATA_TYPE_BOOL: value => (typeof value === 'boolean' || value === 'true' || value === 'false'),
  DATA_TYPE_DATE: value => datePattern.test(value),
  DATA_TYPE_DATETIME: value => dateTimePattern.test(value),
};

const validateDataType = (value, dataType) => {
  const validator = dataTypeValidators[dataType];

  return (validator ? validator(value) : true);
};

const doValidate = (
  data, path = [], recordData, subrecordData, fieldDescriptor, expandRepeating = true
) => {
  if (!fieldDescriptor) {
    return null;
  }

  const results = [];

  if (expandRepeating && isFieldRepeating(fieldDescriptor)) {
    // This is a repeating field, and the expand flag is true. Validate each instance against the
    // current field descriptor.

    const instances = Immutable.List.isList(data) ? data : Immutable.List.of(data);

    instances.forEach((instance, index) => {
      const instanceData = instances.get(index);
      const instancePath = [...path, index];

      const instanceResults =
        doValidate(instanceData, instancePath, recordData, subrecordData, fieldDescriptor, false);

      if (instanceResults) {
        Array.prototype.push.apply(results, instanceResults);
      }
    });

    return (results.length > 0 ? results : null);
  }

  const dataType = getFieldDataType(fieldDescriptor);

  if (dataType === 'DATA_TYPE_MAP' && Immutable.Map.isMap(data)) {
    // Validate this field's children, and add any child results to the results array.

    const childKeys = Object.keys(fieldDescriptor).filter(key => key !== configKey);

    childKeys.forEach((childKey) => {
      const childData = data ? data.get(childKey) : undefined;
      const childPath = [...path, childKey];
      const childFieldDescriptor = fieldDescriptor[childKey];

      const childResults =
        doValidate(childData, childPath, recordData, subrecordData, childFieldDescriptor);

      if (childResults) {
        Array.prototype.push.apply(results, childResults);
      }
    });
  }

  let result;

  // Check required.

  const required = isFieldRequired(fieldDescriptor, recordData);

  // TODO: Does this make sense for compound fields?

  if (required && (typeof data === 'undefined' || data === null || data === '')) {
    result = {
      path,
      error: {
        code: ERR_MISSING_REQ_FIELD,
        message: getRequiredMessage(fieldDescriptor),
      },
    };
  }

  if (!result && typeof data !== 'undefined' && data !== null && data !== '') {
    // Check data type.

    if (!validateDataType(data, dataType)) {
      result = {
        path,
        error: {
          dataType,
          code: ERR_DATA_TYPE,
          value: data,
        },
      };
    }
  }

  if (!result) {
    // Custom validation.

    const customValidator = getFieldCustomValidator(fieldDescriptor);

    if (customValidator) {
      const error = customValidator({ data, path, recordData, subrecordData, fieldDescriptor });

      if (error) {
        result = {
          path,
          error,
        };
      }
    }
  }

  if (result) {
    results.push(result);
  }

  return (results.length > 0 ? results : null);
};

export const validateField = (
  data, path, recordData, subrecordData, fieldDescriptor, expandRepeating
) => {
  const validationResults = doValidate(
    data, path, recordData, subrecordData, fieldDescriptor, expandRepeating
  );

  if (validationResults) {
    // Validation results may either contain error objects, or promises that will resolve to error
    // objects (when the validation function was async). Wait for all of the promises to resolve.

    return (
      Promise.all(validationResults.map(result => result.error))
        .then((resolvedErrors) => {
          // Convert the resolved error array into a tree of errors.

          let errorTree = Immutable.Map();

          resolvedErrors.forEach((error, index) => {
            if (error) {
              const errorPath = [...validationResults[index].path, ERROR_KEY];

              errorTree = deepSet(errorTree, errorPath, Immutable.Map(error));
            }
          });

          return Promise.resolve(errorTree.size > 0 ? errorTree : null);
        })
        .catch(() => {
          // Something went wrong in an async validator. Set an error on the document.

          const errorTree = Immutable.fromJS({
            document: {
              [ERROR_KEY]: {
                code: ERR_UNABLE_TO_VALIDATE,
              },
            },
          });

          return Promise.resolve(errorTree);
        }));
  }

  return Promise.resolve(null);
};

export const validateRecordData = (data, subrecordData, recordTypeConfig) =>
  validateField(data, [], data, subrecordData, get(recordTypeConfig, 'fields'));

const doCompute =
  (data, path = [], recordData, subrecordData, fieldDescriptor, expandRepeating = true) => {
    if (!fieldDescriptor) {
      return undefined;
    }

    const results = [];

    if (expandRepeating && isFieldRepeating(fieldDescriptor)) {
      // This is a repeating field, and the expand flag is true. Compute each instance.

      const instances = Immutable.List.isList(data) ? data : Immutable.List.of(data);

      instances.forEach((instance, index) => {
        const instanceData = instances.get(index);
        const instancePath = [...path, index];

        const instanceResults =
          doCompute(instanceData, instancePath, recordData, subrecordData, fieldDescriptor, false);

        if (instanceResults) {
          Array.prototype.push.apply(results, instanceResults);
        }
      });

      return (results.length > 0 ? results : undefined);
    }

    const dataType = getFieldDataType(fieldDescriptor);

    if (dataType === 'DATA_TYPE_MAP' && Immutable.Map.isMap(data)) {
      // Compute this field's children, and add any child results to the results array.

      const childKeys = Object.keys(fieldDescriptor).filter(key => key !== configKey);

      childKeys.forEach((childKey) => {
        const childData = data ? data.get(childKey) : undefined;
        const childPath = [...path, childKey];
        const childFieldDescriptor = fieldDescriptor[childKey];

        const childResults =
          doCompute(childData, childPath, recordData, subrecordData, childFieldDescriptor);

        if (childResults) {
          Array.prototype.push.apply(results, childResults);
        }
      });
    }

    let result;

    const computer = getFieldComputer(fieldDescriptor);

    if (computer) {
      let value;

      try {
        value = computer({ data, path, recordData, subrecordData, fieldDescriptor });
      } catch (error) {
        value = Promise.reject(error);
      }

      if (typeof value !== 'undefined') {
        result = {
          path,
          value,
        };
      }
    }

    if (result) {
      results.push(result);
    }

    return (results.length > 0 ? results : undefined);
  };

export const computeField =
  (data, path, recordData, subrecordData, fieldDescriptor, expandRepeating = true) => {
    const computationResults = doCompute(
      data,
      path,
      recordData,
      subrecordData,
      fieldDescriptor,
      expandRepeating
    );

    if (typeof computationResults !== 'undefined') {
      // Computation results may either contain values, or promises that will resolve to values
      // (when the computation function was async). Wait for all of the promises to resolve.

      return (
        Promise.all(computationResults.map(result => result.value))
          .then((resolvedValues) => {
            // Convert the resolved value array into a tree of values.

            let valueTree = Immutable.Map();

            resolvedValues.forEach((value, index) => {
              if (typeof value !== 'undefined') {
                const valuePath = computationResults[index].path;

                if (valuePath && valuePath.length > 0 && expandRepeating) {
                  const prevValue = valueTree.getIn(valuePath);
                  const nextValue = prevValue ? prevValue.mergeDeep(value) : value;

                  valueTree = deepSet(valueTree, valuePath, nextValue);
                } else {
                  valueTree = value;
                }
              }
            });

            return Promise.resolve(valueTree);
          })
          // Don't catch rejections, just let the caller handle them.
      );
    }

    return Promise.resolve(undefined);
  };

export const computeRecordData = (data, subrecordData, recordTypeConfig) =>
  computeField(data, [], data, subrecordData, get(recordTypeConfig, 'fields'));

export const isExistingRecord = data => !!(
  // TODO: Move this into record type config.

  data &&
  (
    data.getIn(['document', 'ns2:collectionspace_core', 'uri']) ||
    data.getIn(['ns2:role', '@csid']) ||
    data.getIn(['ns2:accounts_common', '@csid'])
  )
);

export const isNewRecord = data => !isExistingRecord(data);

export const getWorkflowState = data =>
  (data ? data.getIn(['document', 'ns2:collectionspace_core', 'workflowState']) : undefined);

export const isRecordDeprecated = data => isDeprecated(getWorkflowState(data));

export const isRecordLocked = data => isLocked(getWorkflowState(data));

export const isRecordReplicated = data => isReplicated(getWorkflowState(data));

export const isSecurityRecordImmutable = (data) => {
  // Accounts and roles have the concept of "immutability", which is basically the same as
  // locked.

  if (data) {
    const doc = data.first();

    return (
      doc &&
      (
        doc.get('permsProtection') === 'immutable' ||
        doc.get('rolesProtection') === 'immutable'
      )
    );
  }

  return false;
};

export const isRecordImmutable = data => (
  isRecordLocked(data) ||
  isRecordDeprecated(data) ||
  isRecordReplicated(data) ||
  isSecurityRecordImmutable(data)
);

export const hasHierarchyRelations = (data) => {
  const items = data.getIn(['document', 'rel:relations-common-list', 'relation-list-item']);

  return (!!items && (!Immutable.List.isList(items) || items.size > 0));
};

export const hasNarrowerHierarchyRelations = (csid, data) => {
  let items = data.getIn(['document', 'rel:relations-common-list', 'relation-list-item']);

  if (!items) {
    return false;
  }

  if (!Immutable.List.isList(items)) {
    items = Immutable.List.of(items);
  }

  return !!items.find(
    relation => (
      relation.get('predicate') === 'hasBroader' &&
      relation.getIn(['object', 'csid']) === csid
    )
  );
};

export const getStickyFieldValues = (recordTypeConfig, data) => {
  const stickyFields = getStickyFields(recordTypeConfig.fields);

  const stickyData = stickyFields.reduce((updatedData, path) =>
    copyValue(path, data, updatedData), Immutable.Map());

  return stickyData;
};
