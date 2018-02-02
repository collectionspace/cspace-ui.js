/**
 * Converts an object into an array of name/value pairs (two-element arrays), sorted by name.
 */
export const asPairs = (object) => {
  const array = [];

  Object.keys(object).sort().forEach((key) => {
    const value = object[key];

    array.push([key, (((typeof value === 'object') && value) ? asPairs(value) : value)]);
  });

  return array;
};

/**
 * Flattens an object. The resultant object contains the leaf values of the source object,
 * where each value is keyed by its flattened path from the source object. Paths are flattened by
 * joining individual keys with a period.
 */
export const flatten = (object, maxDepth, parentPath, currentDepth = 1) => {
  const flattened = {};

  Object.keys(object).forEach((key) => {
    const path = parentPath ? `${parentPath}.${key}` : key;
    const value = object[key];

    if (typeof value === 'object' && (typeof maxDepth === 'undefined' || currentDepth < maxDepth)) {
      Object.assign(flattened, flatten(value, maxDepth, path, currentDepth + 1));
    } else {
      flattened[path] = value;
    }
  });

  return flattened;
};

/**
 * Compares two objects, returning the keys that have different values. The return value is an
 * object whose keys are the differing keys.
 */
export const diff = (object1, object2, maxDepth) => {
  const flat1 = flatten(object1, maxDepth);
  const flat2 = flatten(object2, maxDepth);

  const diffKeys = {};

  Object.keys(flat1).forEach((key) => {
    if (flat1[key] !== flat2[key]) {
      diffKeys[key] = true;
    }
  });

  Object.keys(flat2).forEach((key) => {
    if (!(key in flat1)) {
      diffKeys[key] = true;
    }
  });

  return diffKeys;
};
