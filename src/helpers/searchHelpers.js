import Immutable from 'immutable';
import get from 'lodash/get';
import moment from 'moment-timezone';

import {
  configKey,
} from './configHelpers';

import {
  NS_PREFIX,
} from './recordDataHelpers';

import {
  DATA_TYPE_LIST,
  DATA_TYPE_BOOL,
  DATA_TYPE_FLOAT,
  DATA_TYPE_INT,
  DATA_TYPE_STRING,
  DATA_TYPE_DATETIME,
} from '../constants/dataTypes';

import {
  OP_AND,
  OP_OR,
  OP_EQ,
  OP_GT,
  OP_GTE,
  OP_LT,
  OP_LTE,
  OP_MATCH,
  OP_RANGE,
} from '../constants/searchOperators';

const getDataType = (fieldDescriptor, path) =>
  get(fieldDescriptor, ['document', ...path.split('/'), configKey, 'dataType']);

export const normalizeTimestampRangeStartValue = (value) => {
  if (value) {
    const timestamp = value.trim();

    if (timestamp) {
      return ((timestamp.indexOf('T') < 0) ? `${timestamp}T00:00:00.000` : timestamp);
    }
  }

  return null;
};

export const normalizeTimestampRangeEndValue = (value) => {
  if (value) {
    const timestamp = value.trim();

    if (timestamp) {
      return ((timestamp.indexOf('T') < 0) ? `${timestamp}T23:59:59.999` : timestamp);
    }
  }

  return null;
};

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

export const normalizeBooleanCondition = (fieldDescriptor, condition) => {
  let childConditions = condition.get('value');

  if (childConditions) {
    /* Gotta do this mutual recursion */
    /* eslint-disable no-use-before-define */
    childConditions = childConditions
      .map(childCondition => normalizeCondition(fieldDescriptor, childCondition))
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

export const normalizeRangeFieldCondition = (fieldDescriptor, condition) => {
  const value = condition.get('value');

  if (value) {
    const path = condition.get('path');
    const dataType = getDataType(fieldDescriptor, path);

    let startValue = value.get(0);
    let endValue = value.get(1);

    if (dataType === DATA_TYPE_DATETIME) {
      startValue = normalizeTimestampRangeStartValue(startValue);
      endValue = normalizeTimestampRangeEndValue(endValue);
    } else {
      startValue = normalizeStringFieldValue(startValue);
      endValue = normalizeStringFieldValue(endValue);
    }

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

    return condition.set('value', Immutable.List([startValue, endValue]));
  }

  return null;
};

export const normalizeFieldCondition = (fieldDescriptor, condition) => {
  const value = normalizeFieldValue(condition.get('value'));

  if (value) {
    return condition.set('value', value);
  }

  return null;
};

export const normalizeCondition = (fieldDescriptor, condition) => {
  if (condition) {
    const operator = condition.get('op');

    switch (operator) {
      case OP_AND:
      case OP_OR:
        return normalizeBooleanCondition(fieldDescriptor, condition);
      case OP_RANGE:
        return normalizeRangeFieldCondition(fieldDescriptor, condition);
      default:
        return normalizeFieldCondition(fieldDescriptor, condition);
    }
  }

  return null;
};

const operatorToNXQLMap = {
  [OP_AND]: 'AND',
  [OP_OR]: 'OR',
  [OP_EQ]: '=',
  [OP_LT]: '<',
  [OP_LTE]: '<=',
  [OP_GT]: '>',
  [OP_GTE]: '>=',
  [OP_MATCH]: 'ILIKE',
  [OP_RANGE]: 'BETWEEN',
};

export const pathToNXQL = (fieldDescriptor, path) => {
  const [partName, ...pathInPartArray] = path.split('/');

  const nxqlPartName = (partName.substr(0, 4) === `${NS_PREFIX}:`)
    ? partName.substr(4)
    : partName;

  const partDescriptor = get(fieldDescriptor, ['document', partName]);
  const nxqlPathInPartArray = [];

  for (let i = 0; i < pathInPartArray.length; i += 1) {
    const fieldName = pathInPartArray[i];
    const fieldPath = pathInPartArray.slice(0, i + 1);
    const fieldConfig = get(partDescriptor, [...fieldPath, configKey]);

    nxqlPathInPartArray.push(fieldName);

    if (fieldConfig && fieldConfig.dataType === DATA_TYPE_LIST) {
      // If the field is a list, replace the next field name with '*'.

      nxqlPathInPartArray.push('*');

      i += 1;
    }
  }

  const nxqlPath = nxqlPathInPartArray.join('/');

  return `${nxqlPartName}:${nxqlPath}`;
};

export const operatorToNXQL = operator => operatorToNXQLMap[operator];

export const valueToNXQL = (value, dataType = DATA_TYPE_STRING, timeZone = 'UTC') => {
  let nxqlValue;

  if (dataType === DATA_TYPE_DATETIME) {
    // Timestamp values in searches must be given in the server's time zone.

    nxqlValue = moment(value, moment.ISO_8601).tz(timeZone).format('YYYY-MM-DDTHH:mm:ss.SSS');

    return `TIMESTAMP "${nxqlValue}"`;
  }

  if (dataType === DATA_TYPE_INT) {
    nxqlValue = parseInt(value, 10);
  } else if (dataType === DATA_TYPE_FLOAT) {
    nxqlValue = parseFloat(value);
  } else if (dataType === DATA_TYPE_BOOL) {
    nxqlValue = value ? 1 : 0;
  } else {
    nxqlValue = value;
  }

  return JSON.stringify(nxqlValue);
};

export const booleanConditionToNXQL = (fieldDescriptor, condition, serverTimeZone) => {
  const operator = condition.get('op');
  const nxqlOp = operatorToNXQL(operator);

  if (nxqlOp) {
    const childConditions = condition.get('value');

    const nxql =
      childConditions
        .map(childCondition =>
          /* Gotta do this mutual recursion */
          /* eslint-disable no-use-before-define */
          advancedSearchConditionToNXQL(fieldDescriptor, childCondition, serverTimeZone))
          /* eslint-enable no-use-before-define */
        .join(` ${nxqlOp} `);

    return `(${nxql})`;
  }

  return '';
};

export const rangeFieldConditionToNXQL = (fieldDescriptor, condition, serverTimeZone) => {
  const path = condition.get('path');
  const operator = condition.get('op');
  const dataType = getDataType(fieldDescriptor, path);
  const values = condition.get('value');

  const nxqlPath = pathToNXQL(fieldDescriptor, path);
  const nxqlOp = operatorToNXQL(operator);

  const startValue = values.get(0);
  const endValue = values.get(1);

  const nxqlValue =
    [startValue, endValue]
      .map(value => valueToNXQL(value, dataType, serverTimeZone))
      .join(' AND ');

  return `${nxqlPath} ${nxqlOp} ${nxqlValue}`;
};

export const fieldConditionToNXQL = (fieldDescriptor, condition, serverTimeZone) => {
  const path = condition.get('path');
  const operator = condition.get('op');
  const dataType = getDataType(fieldDescriptor, path);
  const value = condition.get('value');

  const nxqlPath = pathToNXQL(fieldDescriptor, path);
  const nxqlOp = operatorToNXQL(operator);
  const nxqlValue = valueToNXQL(value, dataType, serverTimeZone);

  return `${nxqlPath} ${nxqlOp} ${nxqlValue}`;
};

export const advancedSearchConditionToNXQL = (fieldDescriptor, condition, serverTimeZone) => {
  if (condition) {
    const operator = condition.get('op');

    switch (operator) {
      case OP_AND:
      case OP_OR:
        return booleanConditionToNXQL(fieldDescriptor, condition, serverTimeZone);
      case OP_RANGE:
        return rangeFieldConditionToNXQL(fieldDescriptor, condition, serverTimeZone);
      default:
        return fieldConditionToNXQL(fieldDescriptor, condition, serverTimeZone);
    }
  }

  return null;
};

