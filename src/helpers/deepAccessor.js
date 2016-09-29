import Immutable from 'immutable';

const numericPattern = /^[0-9]$/;

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
