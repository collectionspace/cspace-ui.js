import React from 'react';
import Immutable from 'immutable';
import mergeWith from 'lodash/mergeWith';
import flatMap from 'lodash/flatMap';
import get from 'lodash/get';
import set from 'lodash/set';
import warning from 'warning';

import {
  ERR_MISSING_VOCABULARY,
  ERR_UNKNOWN_RECORD_TYPE,
  ERR_UNKNOWN_VOCABULARY,
  ERR_UNKNOWN_SUBRESOURCE,
  ERR_INVALID_CSID,
  ERR_INVALID_RELATED_TYPE,
} from '../constants/errorCodes';

import {
  DATA_TYPE_BOOL,
  DATA_TYPE_MAP,
  DATA_TYPE_STRING,
} from '../constants/dataTypes';

import {
  NS_PREFIX,
} from '../constants/xmlNames';

import {
  isCsid,
  isUrnCsid,
} from './csidHelpers';

const onlyDigitsPattern = /^\d+$/;
const isNotNumeric = (string) => !onlyDigitsPattern.test(string);

export const configKey = '[config]';
export const mergeKey = '[merge]';

export const dataPathToFieldDescriptorPath = (dataPath) => dataPath.filter(isNotNumeric);

export const initializeExtensionFieldParents = (fieldDescriptor) => {
  if (fieldDescriptor) {
    Object.keys(fieldDescriptor).filter((key) => key !== configKey).forEach((key) => {
      const childFieldDescriptor = fieldDescriptor[key];
      const isExtensionField = get(childFieldDescriptor, [configKey, 'extensionName']);

      if (isExtensionField) {
        // Make a copy of this field descriptor and its configuration, so that different
        // configuration can be applied to each use of the extension (really wishing I'd made the
        // config an Immutable, so explicit copy wouldn't be necessary).

        // Set the extension parent config in the extension field's config.

        const childFieldDescriptorCopy = {
          ...childFieldDescriptor,
          [configKey]: {
            ...childFieldDescriptor[configKey],
            extensionParentConfig:
            fieldDescriptor[configKey],
          },
        };

        // eslint-disable-next-line no-param-reassign
        fieldDescriptor[key] = childFieldDescriptorCopy;
      } else {
        initializeExtensionFieldParents(childFieldDescriptor);
      }
    });
  }
};

/*
 * Initialize the extension configurations in a configuration object. This function mutates the
 * argument configuration.
 *
 * - Set the extensionName property of each top level field in the extension to the extension name
 */
export const initializeExtensions = (config) => {
  const { extensions } = config;

  if (extensions) {
    Object.keys(extensions).forEach((extensionName) => {
      const extension = extensions[extensionName];
      const { fields } = extension;

      if (fields) {
        Object.values(fields).forEach((fieldDescriptor) => {
          set(fieldDescriptor, [configKey, 'extensionName'], extensionName);
          initializeExtensionFieldParents(fieldDescriptor);
        });
      }
    });
  }

  return config;
};

/*
 * Initialize the record type configurations in a configuration object. This function mutates the
 * argument configuration.
 *
 * - Set the name property of each recordTypes entry to its key
 * - Set the name property of each vocabularies entry to its key
 * - Set the parent property of any extension fields
 */
export const initializeRecordTypes = (config) => {
  const keys = [
    'recordTypes',
    ['invocables', 'report'],
    ['invocables', 'batch'],
  ];

  keys.forEach((key) => {
    const recordTypesConfig = get(config, key);

    if (recordTypesConfig) {
      Object.keys(recordTypesConfig).forEach((recordTypeName) => {
        const recordType = recordTypesConfig[recordTypeName];

        recordType.name = recordTypeName;

        const { fields, vocabularies } = recordType;

        if (fields) {
          Object.values(fields).forEach((fieldDescriptor) => {
            initializeExtensionFieldParents(fieldDescriptor);
          });
        }

        if (vocabularies) {
          Object.keys(vocabularies).forEach((vocabularyName) => {
            vocabularies[vocabularyName].name = vocabularyName;
          });
        }
      });
    }
  });

  return config;
};

/*
 * Finalize the record type configurations in a configuration object. This function mutates the
 * argument configuration.
 *
 * - Delete any record type or vocabulary that is disabled
 * - Set the disableAltTerms property of each vocabulary to the top-level disableAltTerms property
 *   if it is undefined
 */
export const finalizeRecordTypes = (config) => {
  const { recordTypes } = config;

  if (recordTypes) {
    Object.keys(recordTypes).forEach((recordTypeName) => {
      const recordType = recordTypes[recordTypeName];

      if (recordType.disabled) {
        delete recordTypes[recordTypeName];
      } else {
        const { vocabularies } = recordType;

        if (vocabularies) {
          Object.keys(vocabularies).forEach((vocabularyName) => {
            const vocabulary = vocabularies[vocabularyName];

            if (vocabulary.disabled) {
              delete vocabularies[vocabularyName];
            } else if (typeof vocabulary.disableAltTerms === 'undefined') {
              vocabulary.disableAltTerms = config.disableAltTerms;
            }
          });
        }
      }
    });
  }

  return config;
};

export const evaluatePlugin = (plugin, configContext) => {
  const pluginType = typeof plugin;

  const isValidType = plugin
    && (pluginType === 'function' || (pluginType === 'object' && !Array.isArray(plugin)));

  warning(isValidType, 'A plugin must be an object or a function.');

  if (!isValidType) {
    return {};
  }

  const config = (pluginType === 'object') ? plugin : plugin(configContext);

  initializeExtensions(config);
  initializeRecordTypes(config);

  return config;
};

export const applyPlugin = (targetConfig, plugin, configContext = {}) => {
  const pluginConfigContribution = evaluatePlugin(plugin, configContext);

  /* Gotta do this mutual recursion */
  /* eslint-disable no-use-before-define */
  return mergeConfig(targetConfig, pluginConfigContribution, configContext);
  /* eslint-enable no-use-before-define */
};

export const applyPlugins = (targetConfig, plugins, configContext = {}) => {
  const isArray = Array.isArray(plugins);

  warning(isArray, 'Plugins must be an array.');

  if (!isArray) {
    return targetConfig;
  }

  return plugins.reduce((updatedConfig, plugin) => {
    // eslint-disable-next-line no-param-reassign
    configContext.config = updatedConfig;

    return applyPlugin(updatedConfig, plugin, configContext);
  }, targetConfig);
};

export const mergeStrategy = {
  override: (srcValue) => ({ ...srcValue, [mergeKey]: 'override' }),
};

const configMerger = (objValue, srcValue, key) => {
  if (Array.isArray(objValue)) {
    // Don't merge arrays. Just override with the source value.
    return srcValue;
  }

  if (key === 'advancedSearch') {
    // Don't merge advanced search config. Just override with the source value.
    return srcValue;
  }

  if (React.isValidElement(objValue)) {
    // Don't merge React elements, e.g. in form templates. Just override with the source value.
    return srcValue;
  }

  if (srcValue && typeof srcValue === 'object' && srcValue[mergeKey] === 'override') {
    const srcValueCopy = { ...srcValue };

    delete srcValueCopy[mergeKey];

    return srcValueCopy;
  }

  return undefined;
};

export const mergeConfig = (targetConfig, sourceConfig, configContext = {}) => {
  // eslint-disable-next-line no-param-reassign
  configContext.config = targetConfig;

  const pluginsAppliedConfig = (sourceConfig && ('plugins' in sourceConfig))
    ? applyPlugins(targetConfig, sourceConfig.plugins, configContext)
    : targetConfig;

  const mergedConfig = mergeWith({}, pluginsAppliedConfig, sourceConfig, configMerger);

  delete mergedConfig.plugins;

  return mergedConfig;
};

export const initConfig = (config, configContext) => mergeConfig({}, config, configContext);

export const getRecordTypeConfigByServiceDocumentName = (config, documentName) => {
  if (!documentName) {
    return undefined;
  }

  if (!config.recordTypesByServiceDocumentName) {
    const recordTypesByServiceDocumentName = {};
    const { recordTypes } = config;

    Object.keys(recordTypes).forEach((recordType) => {
      const recordTypeConfig = recordTypes[recordType];
      const { serviceConfig } = recordTypeConfig;

      recordTypesByServiceDocumentName[serviceConfig.documentName] = recordTypeConfig;
    });

    /* eslint-disable no-param-reassign */
    config.recordTypesByServiceDocumentName = recordTypesByServiceDocumentName;
    /* eslint-enable no-param-reassign */
  }

  return config.recordTypesByServiceDocumentName[documentName];
};

export const getRecordTypeConfigByServiceObjectName = (config, objectName) => {
  if (!objectName) {
    return undefined;
  }

  if (!config.recordTypesByServiceObjectName) {
    const recordTypesByServiceObjectName = {};
    const { recordTypes } = config;

    Object.keys(recordTypes).forEach((recordType) => {
      const recordTypeConfig = recordTypes[recordType];

      recordTypesByServiceObjectName[recordTypeConfig.serviceConfig.objectName] = recordTypeConfig;
    });

    /* eslint-disable no-param-reassign */
    config.recordTypesByServiceObjectName = recordTypesByServiceObjectName;
    /* eslint-enable no-param-reassign */
  }

  return config.recordTypesByServiceObjectName[objectName];
};

export const getRecordTypeNameByServiceObjectName = (config, objectName) => {
  const recordTypeConfig = getRecordTypeConfigByServiceObjectName(config, objectName);

  return (recordTypeConfig ? recordTypeConfig.name : undefined);
};

export const getRecordTypeConfigByServicePath = (config, servicePath) => {
  if (!servicePath) {
    return undefined;
  }

  if (!config.recordTypesByServicePath) {
    const recordTypesByServicePath = {};
    const { recordTypes } = config;

    Object.keys(recordTypes).forEach((recordType) => {
      const recordTypeConfig = recordTypes[recordType];

      recordTypesByServicePath[recordTypeConfig.serviceConfig.servicePath] = recordTypeConfig;
    });

    /* eslint-disable no-param-reassign */
    config.recordTypesByServicePath = recordTypesByServicePath;
    /* eslint-enable no-param-reassign */
  }

  return config.recordTypesByServicePath[servicePath];
};

export const getRecordTypeConfigByUri = (config, uri) => {
  if (!uri) {
    return undefined;
  }

  const servicePath = uri.split('/', 2)[1];

  return getRecordTypeConfigByServicePath(config, servicePath);
};

export const getRecordTypeNameByUri = (config, uri) => {
  const recordTypeConfig = getRecordTypeConfigByUri(config, uri);

  return (recordTypeConfig ? recordTypeConfig.name : undefined);
};

export const getVocabularyConfigByShortID = (recordTypeConfig, shortID) => {
  if (!shortID) {
    return undefined;
  }

  if (!recordTypeConfig.vocabulariesByShortID) {
    const vocabulariesByShortID = {};
    const { vocabularies } = recordTypeConfig;

    if (vocabularies) {
      Object.keys(vocabularies).forEach((vocabulary) => {
        const vocabularyConfig = vocabularies[vocabulary];
        const { servicePath } = vocabularyConfig.serviceConfig;

        if (
          servicePath
          && servicePath.indexOf('urn:cspace:name(') === 0
          && servicePath.lastIndexOf(')') === servicePath.length - 1
        ) {
          const vocabularyShortID = servicePath.substring(16, servicePath.length - 1);

          vocabulariesByShortID[vocabularyShortID] = vocabularyConfig;
        }
      });

      /* eslint-disable no-param-reassign */
      recordTypeConfig.vocabulariesByShortID = vocabulariesByShortID;
      /* eslint-enable no-param-reassign */
    }
  }

  return recordTypeConfig.vocabulariesByShortID[shortID];
};

const vocabularyServicePathPattern = /^urn:cspace:name\((.*?)\)$/;

export const getVocabularyConfigByServicePath = (recordTypeConfig, servicePath) => {
  const match = vocabularyServicePathPattern.exec(servicePath);

  if (!match) {
    return undefined;
  }

  const shortID = match[1];

  return getVocabularyConfigByShortID(recordTypeConfig, shortID);
};

export const getDefaultValue = (fieldDescriptor) => {
  const config = fieldDescriptor[configKey];

  if (config) {
    const {
      dataType,
      defaultValue,
    } = config;

    if (typeof defaultValue === 'object' && !Immutable.Map.isMap(defaultValue)) {
      // If an object is supplied as a default value, convert it to an immutable map.

      return Immutable.fromJS(defaultValue);
    }

    if (typeof defaultValue === 'undefined' && dataType === DATA_TYPE_BOOL) {
      // If no default value is configured for a boolean field, consider it to be false.

      return false;
    }

    return defaultValue;
  }

  return undefined;
};

export const getDefaults = (fieldDescriptor, currentPath = []) => {
  let results = [];

  const defaultValue = getDefaultValue(fieldDescriptor);

  if (typeof defaultValue !== 'undefined') {
    results = results.concat({
      path: currentPath,
      value: defaultValue,
    });
  }

  const childKeys = Object.keys(fieldDescriptor).filter((key) => key !== configKey);

  childKeys.forEach((childKey) => {
    const childPath = currentPath.concat(childKey);
    const childfieldDescriptor = fieldDescriptor[childKey];
    const childResults = getDefaults(childfieldDescriptor, childPath);

    results = results.concat(childResults);
  });

  return results;
};

/**
 * Returns an array of paths to sticky fields that exist under a given field.
 */
export const getStickyFields = (fieldDescriptor, currentPath = []) => {
  if (!fieldDescriptor) {
    return [];
  }

  const isSticky = get(fieldDescriptor, [configKey, 'sticky']);

  if (isSticky) {
    return [currentPath];
  }

  return Object.keys(fieldDescriptor)
    .filter((key) => key !== configKey)
    .reduce((results, childKey) => {
      const childPath = currentPath.concat(childKey);
      const childfieldDescriptor = fieldDescriptor[childKey];
      const childResults = getStickyFields(childfieldDescriptor, childPath);

      return results.concat(childResults);
    }, []);
};

export const isAutocompleteField = (fieldDescriptor) => {
  const viewType = get(fieldDescriptor, [configKey, 'view', 'type']);

  return (JSON.stringify(viewType) === '"AutocompleteInput"');
};

export const isFieldCloneable = (fieldDescriptor) => {
  const config = fieldDescriptor[configKey];

  if (config && 'cloneable' in config) {
    return config.cloneable;
  }

  return true;
};

export const isFieldViewReadOnly = (computeContext) => {
  const {
    fieldDescriptor,
    isSearch,
  } = computeContext;

  let readOnly;

  const fieldConfig = get(fieldDescriptor, configKey);

  if (fieldConfig) {
    const viewConfig = isSearch
      ? fieldConfig.searchView || fieldConfig.view
      : fieldConfig.view;

    readOnly = get(viewConfig, ['props', 'readOnly']);

    if (typeof readOnly === 'function') {
      const callComputeContext = { ...computeContext };

      // Don't include the data property of the compute context when calling the function, since it
      // doesn't really make sense to have the read only state of a field depend on the value in the
      // field.

      delete callComputeContext.data;

      readOnly = readOnly(callComputeContext);
    }
  }

  return !!readOnly;
};

export const isFieldRepeating = (fieldDescriptor) => {
  const config = fieldDescriptor[configKey];

  if (config && 'repeating' in config) {
    return config.repeating;
  }

  return false;
};

export const isFieldRequired = (computeContext) => {
  const { fieldDescriptor } = computeContext;

  let required = get(fieldDescriptor, [configKey, 'required']);

  if (typeof required === 'function') {
    const callComputeContext = { ...computeContext };

    // Don't include the data property of the compute context when calling the function, since it
    // doesn't really make sense to have the required state of a field depend on the value in the
    // field.

    delete callComputeContext.data;

    required = required(callComputeContext);
  }

  return !!required;
};

export const getFieldDataType = (fieldDescriptor) => {
  let type;

  const fieldConfig = fieldDescriptor[configKey];

  if (fieldConfig) {
    type = fieldConfig.dataType;
  }

  if (!type) {
    // Check if there are child field descriptors. If so, default to map.

    const keys = Object.keys(fieldDescriptor);

    for (let i = 0; i < keys.length; i += 1) {
      if (keys[i] !== configKey) {
        type = DATA_TYPE_MAP;
        break;
      }
    }
  }

  if (!type) {
    // Default to string.

    type = DATA_TYPE_STRING;
  }

  return type;
};

export const getFieldCustomValidator = (fieldDescriptor) => {
  let validator;

  const fieldConfig = fieldDescriptor[configKey];

  if (fieldConfig) {
    validator = fieldConfig.validate;
  }

  return validator;
};

export const getFieldComputer = (fieldDescriptor) => {
  let computer;

  const fieldConfig = fieldDescriptor[configKey];

  if (fieldConfig) {
    computer = fieldConfig.compute;
  }

  return computer;
};

export const getRequiredMessage = (fieldDescriptor) => get(fieldDescriptor, [configKey, 'messages', 'required']);

export const isAuthority = (recordTypeConfig) => get(recordTypeConfig, ['serviceConfig', 'serviceType']) === 'authority';

export const isUtility = (recordTypeConfig) => get(recordTypeConfig, ['serviceConfig', 'serviceType']) === 'utility';

export const validateLocation = (config, location) => {
  const {
    recordType,
    vocabulary,
    csid,
    subresource,
    relatedRecordType,
    relatedCsid,
  } = location;

  const recordTypeConfig = get(config, ['recordTypes', recordType]);

  if (!recordTypeConfig || recordTypeConfig.disabled) {
    return {
      error: {
        recordType,
        code: ERR_UNKNOWN_RECORD_TYPE,
      },
    };
  }

  if (isAuthority(recordTypeConfig)) {
    if (!vocabulary) {
      return {
        error: {
          recordType,
          code: ERR_MISSING_VOCABULARY,
        },
      };
    }

    const vocabularyConfig = get(recordTypeConfig, ['vocabularies', vocabulary]);

    if (!vocabularyConfig || vocabularyConfig.disabled) {
      return {
        error: {
          recordType,
          vocabulary,
          code: ERR_UNKNOWN_VOCABULARY,
        },
      };
    }
  } else if (vocabulary) {
    return {
      error: {
        recordType,
        vocabulary,
        code: ERR_UNKNOWN_VOCABULARY,
      },
    };
  }

  if (csid && !isCsid(csid) && !isUrnCsid(csid)) {
    return {
      error: {
        csid,
        code: ERR_INVALID_CSID,
      },
    };
  }

  if (subresource) {
    const subresourceConfig = get(config, ['subresources', subresource]);

    if (!subresourceConfig) {
      return {
        error: {
          subresource,
          code: ERR_UNKNOWN_SUBRESOURCE,
        },
      };
    }
  }

  if (relatedRecordType) {
    const serviceType = get(recordTypeConfig, ['serviceConfig', 'serviceType']);
    const relatedServiceType = get(config, ['recordTypes', relatedRecordType, 'serviceConfig', 'serviceType']);

    if (
      (serviceType !== 'procedure' && serviceType !== 'object')
      || (relatedServiceType !== 'procedure' && relatedServiceType !== 'object')
    ) {
      return {
        error: {
          recordType,
          relatedRecordType,
          code: ERR_INVALID_RELATED_TYPE,
        },
      };
    }
  }

  if (relatedCsid && !isCsid(relatedCsid)) {
    return {
      error: {
        csid: relatedCsid,
        code: ERR_INVALID_CSID,
      },
    };
  }

  return {};
};

export const getDefaultSearchRecordType = (config) => {
  const { recordTypes } = config;
  const names = Object.keys(recordTypes);

  let defaultSearchRecordType;

  for (let i = 0; i < names.length; i += 1) {
    const name = names[i];

    if (recordTypes[name].defaultForSearch) {
      defaultSearchRecordType = name;
      break;
    }
  }

  return (defaultSearchRecordType || names[0]);
};

export const getDefaultSearchVocabulary = (recordTypeConfig) => {
  const { vocabularies } = recordTypeConfig;
  const names = Object.keys(vocabularies);

  let defaultSearchVocabulary;

  for (let i = 0; i < names.length; i += 1) {
    const name = names[i];

    if (vocabularies[name].defaultForSearch) {
      defaultSearchVocabulary = name;
      break;
    }
  }

  return (defaultSearchVocabulary || names[0]);
};

export const findField = (parentFieldDescriptor, fieldName) => {
  const keys = Object.keys(parentFieldDescriptor);

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const value = parentFieldDescriptor[key];

    if (key === fieldName) {
      return value;
    }

    if (key !== configKey) {
      const fieldDescriptor = findField(value, fieldName);

      if (fieldDescriptor) {
        return fieldDescriptor;
      }
    }
  }

  return null;
};

export const findFieldConfigInPart = (recordTypeConfig, partName, fieldName) => {
  const partDescriptor = get(recordTypeConfig, ['fields', 'document', `${NS_PREFIX}:${partName}`]);

  if (!partDescriptor) {
    return null;
  }

  // 1. Look for the field as a direct child of the part.

  let fieldDescriptor = partDescriptor[fieldName];

  // 2. Check for a memoized result.

  if (!fieldDescriptor) {
    fieldDescriptor = get(recordTypeConfig, ['fieldsByPart', partName, fieldName]);
  }

  // 3. Search for a nested field.

  if (typeof fieldDescriptor === 'undefined') {
    fieldDescriptor = findField(partDescriptor, fieldName);

    // Memoize the result.

    set(recordTypeConfig, ['fieldsByPart', partName, fieldName], fieldDescriptor);
  }

  return (fieldDescriptor ? fieldDescriptor[configKey] : null);
};

const findFieldsWithSource = (fieldDescriptor, shortId, viewType) => {
  const fieldsWithSource = flatMap(Object.keys(fieldDescriptor).filter((key) => key !== configKey),
    (childFieldName) => findFieldsWithSource(fieldDescriptor[childFieldName], shortId, viewType));

  const fieldConfig = fieldDescriptor[configKey];
  const fieldViewType = get(fieldConfig, ['view', 'type']);
  const source = get(fieldConfig, ['view', 'props', 'source']);

  if (source === shortId) {
    if (!viewType || (viewType === fieldViewType)) {
      fieldsWithSource.push(fieldConfig);
    }
  }

  return fieldsWithSource;
};

export const findVocabularyUses = (config, shortId, vocabularyType) => {
  if (!shortId) {
    return null;
  }

  const uses = {};

  Object.values(config.recordTypes).forEach((recordTypeConfig) => {
    const fieldDescriptor = recordTypeConfig.fields;

    if (fieldDescriptor) {
      const fields = findFieldsWithSource(recordTypeConfig.fields, shortId, vocabularyType);

      if (fields.length > 0) {
        uses[recordTypeConfig.name] = fields;
      }
    }
  });

  return uses;
};

export const getFirstColumnName = (config, recordType, columnSetName = 'default') => {
  const columnConfig = get(config, ['recordTypes', recordType, 'columns', columnSetName]);

  if (!columnConfig) {
    return undefined;
  }

  const orderedColumnNames = Object.keys(columnConfig)
    .filter((name) => {
      const {
        disabled,
        width,
      } = columnConfig[name];

      return (
        !disabled
        // FIXME: This is a hack to filter out thumbnail/icon columns, so that the first text column
        // is returned.
        && (typeof width === 'undefined' || width >= 100)
      );
    })
    .sort((nameA, nameB) => {
      const orderA = columnConfig[nameA].order;
      const orderB = columnConfig[nameB].order;

      return orderA - orderB;
    });

  return orderedColumnNames[0];
};

export const getRecordFieldOptionListName = (recordType, rootPath) => {
  const atPath = rootPath ? `@${rootPath}` : '';

  return `_field_${recordType}${atPath}`;
};

export const getRecordGroupOptionListName = (recordType, rootPath) => {
  const atPath = rootPath ? `@${rootPath}` : '';

  return `_fieldgroup_${recordType}${atPath}`;
};
