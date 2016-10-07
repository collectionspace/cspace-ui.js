import Immutable from 'immutable';

const numericPattern = /^[0-9]$/;

export const NS_PREFIX = 'ns2';
export const DOCUMENT_PROPERTY_NAME = 'document';

export function getPartPropertyName(partName) {
  return `${NS_PREFIX}:${partName}`;
}

export function getPart(cspaceDocument, partName) {
  return cspaceDocument.get(getPartPropertyName(partName));
}

export function getPartNSPropertyName() {
  return `@xmlns:${NS_PREFIX}`;
}

/**
 * Deeply get a value in an Immutable.Map. This is similar to Immutable.Map.getIn, but differs in
 * one way:
 *
 * When a key of '0' is encountered, and that key is used to index a data item that is not a List,
 * the data item itself is returned. This accommodates data in which a list containing a single
 * item may be represented by that one item.
 */
export function deepGet(data, path) {
  if (!Array.isArray(path) || path.length === 0) {
    throw new Error('path must be a non-empty array');
  }

  if (!data) {
    return undefined;
  }

  const [key, ...rest] = path;

  let value;

  if (key === '0' && !Immutable.List.isList(data)) {
    // Allow a key of '0' to refer to a single non-list value.
    value = data;
  } else {
    value = data.get(key);
  }

  if (!value || rest.length === 0) {
    return value;
  }

  return deepGet(value, rest);
}

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
export function deepSet(data, path, value) {
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
}

/**
 * Create a skeletal document for a given CollectionSpace service.
 */
export function createDocument(serviceConfig) {
  const cspaceDocument = {
    '@name': serviceConfig.name,
  };

  const parts = serviceConfig.parts;

  Object.keys(parts).forEach((part) => {
    cspaceDocument[getPartPropertyName(part)] = {
      [getPartNSPropertyName()]: parts[part],
    };
  });

  return Immutable.fromJS(cspaceDocument);
}

/**
 * Create a skeletal data record for a given CollectionSpace service.
 */
export function createRecordData(serviceConfig) {
  return Immutable.Map().set(DOCUMENT_PROPERTY_NAME, createDocument(serviceConfig));
}

/**
 * Get the document from the data record.
 */
export function getDocument(data) {
  return data.get(DOCUMENT_PROPERTY_NAME);
}

/**
 * Comparator function to sort properties that represent XML attributes and namespace declarations
 * (those that start with '@') to the top.
 */
export function attributePropertiesToTop(propertyNameA, propertyNameB) {
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
}

/**
 * Prepare record data for POST or PUT to the CollectionSpace REST API. Document parts that may
 * be present in data retrieved from the REST API, but that do not need to be present in data sent
 * to the API, are removed. In the remaining parts, properties beginning with '@', which represent
 * XML attributes and namespace declarations, are moved to the top. This is required by the REST
 * API in order to properly translate the payload to XML.
 */
export function prepareForSending(data) {
  // Filter out the core schema and account information parts.

  let cspaceDocument = data.get(DOCUMENT_PROPERTY_NAME)
    .filter((value, key) =>
      (key !== `${NS_PREFIX}:collectionspace_core` && key !== `${NS_PREFIX}:account_permission`));

  // For each remaining part, move XML attribute and namespace declaration properties (those
  // that start with @) to the top, since the REST API requires this.

  for (const key of cspaceDocument.keys()) {
    if (key.charAt(0) !== '@') {
      const part = cspaceDocument.get(key);
      const sortedPart = part.sortBy((value, name) => name, attributePropertiesToTop);

      cspaceDocument = cspaceDocument.set(key, sortedPart);
    }
  }

  return data.set(DOCUMENT_PROPERTY_NAME, cspaceDocument);
}
