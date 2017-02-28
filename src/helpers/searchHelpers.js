import Immutable from 'immutable';

import {
  OP_AND,
  OP_OR,
  OP_RANGE,
  OP_GTE,
  OP_LTE,
} from '../constants/searchOperators';

export const normalizeStringFieldValue = (value) => {
  let trimmed;

  if (value) {
    trimmed = value.trim();
  }

  return (trimmed || null);
};

export const normalizeListFieldValue = (list) => {
  let filtered;

  if (list) {
    filtered = list
      .map(value => normalizeStringFieldValue(value))
      .filter(value => !!value);
  }

  return ((filtered && filtered.size > 0) ? filtered : null);
};

export const normalizeFieldValue = value => (
  Immutable.List.isList(value)
    ? normalizeListFieldValue(value)
    : normalizeStringFieldValue(value)
);

export const normalizeBooleanCondition = (condition) => {
  let childConditions = condition.get('value');

  if (childConditions) {
    /* Gotta do this mutual recursion */
    /* eslint-disable no-use-before-define */
    childConditions = childConditions
      .map(childCondition => normalizeCondition(childCondition))
      .filter(childCondition => !!childCondition);
    /* eslint-enable no-use-before-define */
  }

  if (childConditions && childConditions.size > 0) {
    if (childConditions.size > 1) {
      return condition.set('value', childConditions);
    }

    return childConditions.get(0);
  }

  return null;
};

export const normalizeRangeFieldCondition = (condition) => {
  let value = condition.get('value');

  if (value) {
    value = value.map(item => normalizeStringFieldValue(item));

    const startValue = value.get(0);
    const endValue = value.get(1);

    if (!startValue && !endValue) {
      return null;
    }

    if (!startValue) {
      return Immutable.Map({
        op: OP_LTE,
        path: condition.get('path'),
        value: endValue,
      });
    }

    if (!endValue) {
      return Immutable.Map({
        op: OP_GTE,
        path: condition.get('path'),
        value: startValue,
      });
    }

    return condition.set('value', value);
  }

  return null;
};

export const normalizeFieldCondition = (condition) => {
  const value = normalizeFieldValue(condition.get('value'));

  if (value) {
    return condition.set('value', value);
  }

  return null;
};

export const normalizeCondition = (condition) => {
  if (condition) {
    const operator = condition.get('op');

    switch (operator) {
      case OP_AND:
      case OP_OR:
        return normalizeBooleanCondition(condition);
      case OP_RANGE:
        return normalizeRangeFieldCondition(condition);
      default:
        return normalizeFieldCondition(condition);
    }
  }

  return null;
};
