import Immutable from 'immutable';
import get from 'lodash/get';
import moment from 'moment';
import qs from 'qs';
import warning from 'warning';
import { canList } from './permissionHelpers';

import {
  configKey,
} from './configHelpers';

import {
  DATA_TYPE_BOOL,
  DATA_TYPE_DATE,
  DATA_TYPE_DATETIME,
  DATA_TYPE_FLOAT,
  DATA_TYPE_INT,
  DATA_TYPE_STRING,
  DATA_TYPE_STRUCTURED_DATE,
} from '../constants/dataTypes';

import {
  SEARCH_RESULT_ACCOUNT_PAGE,
  SEARCH_RESULT_AUTH_ROLE_PAGE,
} from '../constants/searchNames';

import {
  OP_AND,
  OP_OR,
  OP_COMPLETE,
  OP_EQ,
  OP_GT,
  OP_GTC,
  OP_GTE,
  OP_LT,
  OP_LTC,
  OP_LTE,
  OP_CONTAIN,
  OP_MATCH,
  OP_RANGE,
  OP_NULL,
  OP_NOT_COMPLETE,
  OP_NOT_CONTAIN,
  OP_NOT_EQ,
  OP_NOT_MATCH,
  OP_NOT_RANGE,
  OP_NOT_NULL,
  OP_GROUP,
} from '../constants/searchOperators';

import {
  NS_PREFIX,
} from '../constants/xmlNames';

const opsByDataTypeMapNew = {
  [DATA_TYPE_STRING]: [
    OP_EQ,
    OP_NOT_EQ,
    OP_CONTAIN,
    OP_NOT_CONTAIN,
    OP_MATCH,
    OP_NOT_MATCH,
    OP_NULL,
    OP_NOT_NULL,
  ],
  [DATA_TYPE_INT]: [
    OP_EQ,
    OP_NOT_EQ,
    OP_NULL,
    OP_NOT_NULL,
    OP_GTE,
    OP_LTE,
    OP_GT,
    OP_LT,
    OP_RANGE,
    OP_NOT_RANGE,
  ],
  [DATA_TYPE_FLOAT]: [
    OP_EQ,
    OP_NOT_EQ,
    OP_NULL,
    OP_NOT_NULL,
    OP_GTE,
    OP_LTE,
    OP_GT,
    OP_LT,
    OP_RANGE,
    OP_NOT_RANGE,
  ],
  [DATA_TYPE_BOOL]: [
    OP_EQ,
    OP_NULL,
    OP_NOT_NULL,
  ],
  [DATA_TYPE_DATE]: [
    OP_EQ,
    OP_NOT_EQ,
    // OP_CONTAIN, TODO: needs backend update
    // OP_NOT_CONTAIN, TODO: needs backend update
    OP_NULL,
    OP_NOT_NULL,
    OP_GTE,
    OP_LTE,
    OP_GT,
    OP_LT,
    OP_RANGE,
    OP_NOT_RANGE,
  ],
  [DATA_TYPE_DATETIME]: [
    OP_EQ,
    OP_NOT_EQ,
    // OP_CONTAIN, TODO: needs backend update
    // OP_NOT_CONTAIN, TODO: needs backend update
    OP_NULL,
    OP_NOT_NULL,
    OP_GTE,
    OP_LTE,
    OP_GT,
    OP_LT,
    OP_RANGE,
    OP_NOT_RANGE,
  ],
  [DATA_TYPE_STRUCTURED_DATE]: [
    OP_NULL,
    OP_NOT_NULL,
    OP_GTC,
    OP_LTC,
    OP_GT,
    OP_LT,
    OP_RANGE,
    OP_NOT_RANGE,
    OP_COMPLETE,
    OP_NOT_COMPLETE,
  ],
};

const opsByDataTypeMap = {
  [DATA_TYPE_STRING]: [
    OP_CONTAIN,
    OP_NOT_CONTAIN,
    OP_MATCH,
    OP_NOT_MATCH,
    OP_RANGE,
    OP_NOT_RANGE,
    OP_GT,
    OP_GTE,
    OP_LT,
    OP_LTE,
    OP_EQ,
    OP_NOT_EQ,
    OP_NULL,
    OP_NOT_NULL,
  ],
  [DATA_TYPE_INT]: [
    OP_RANGE,
    OP_NOT_RANGE,
    OP_GT,
    OP_GTE,
    OP_LT,
    OP_LTE,
    OP_EQ,
    OP_NOT_EQ,
    OP_NULL,
    OP_NOT_NULL,
  ],
  [DATA_TYPE_FLOAT]: [
    OP_RANGE,
    OP_NOT_RANGE,
    OP_GT,
    OP_GTE,
    OP_LT,
    OP_LTE,
    OP_EQ,
    OP_NOT_EQ,
    OP_NULL,
    OP_NOT_NULL,
  ],
  [DATA_TYPE_BOOL]: [
    OP_EQ,
    OP_NULL,
    OP_NOT_NULL,
  ],
  [DATA_TYPE_DATE]: [
    OP_RANGE,
    OP_NOT_RANGE,
    OP_GT,
    OP_GTE,
    OP_LT,
    OP_LTE,
    OP_EQ,
    OP_NOT_EQ,
    OP_NULL,
    OP_NOT_NULL,
  ],
  [DATA_TYPE_DATETIME]: [
    OP_RANGE,
    OP_NOT_RANGE,
    OP_GT,
    OP_GTE,
    OP_LT,
    OP_LTE,
    OP_EQ,
    OP_NOT_EQ,
    OP_NULL,
    OP_NOT_NULL,
  ],
  [DATA_TYPE_STRUCTURED_DATE]: [
    OP_RANGE,
    OP_NOT_RANGE,
    OP_CONTAIN,
    OP_NOT_CONTAIN,
    OP_GT,
    OP_GTC,
    OP_LT,
    OP_LTC,
    OP_EQ,
    OP_NOT_EQ,
    OP_NOT_COMPLETE,
    OP_COMPLETE,
  ],
};

const autocompleteOps = [
  OP_EQ,
  OP_NOT_EQ,
  OP_CONTAIN,
  OP_NOT_CONTAIN,
  OP_MATCH,
  OP_NOT_MATCH,
  OP_NULL,
  OP_NOT_NULL,
];

const controlledListOps = [
  OP_EQ,
  OP_NOT_EQ,
  OP_NULL,
  OP_NOT_NULL,
];

export const getOperatorsForDataType = (
  dataType = DATA_TYPE_STRING,
  isControlled,
  isNewSearchForm,
  isAutocomplete,
) => {
  if (isAutocomplete && isNewSearchForm) return autocompleteOps;
  if (isControlled) return controlledListOps;

  const opsByDataType = isNewSearchForm
    ? opsByDataTypeMapNew[dataType] : opsByDataTypeMap[dataType];

  return opsByDataType ?? [];
};

export const operatorExpectsValue = (op) => (
  op !== OP_NULL
  && op !== OP_NOT_NULL
  && op !== OP_COMPLETE
  && op !== OP_NOT_COMPLETE
);

export const operatorSupportsMultipleValues = (op) => (
  // There is no need to support multiple values with greater than/less than operators, since they
  // are redundant. The range search operator could conceivably have multiple values (non-
  // overlapping ranges), but the range search input doesn't support multiple values right now.
  // This could be implemented if it's needed.

  // The below operators allow multiple values.

  op === OP_EQ
  || op === OP_CONTAIN
  || op === OP_MATCH
  || op === OP_RANGE
  || op === OP_NOT_EQ
  || op === OP_NOT_CONTAIN
  || op === OP_NOT_MATCH
  || op === OP_NOT_RANGE
);

export const dataTypeSupportsMultipleValues = (dataType) => (
  // Booleans only have two possible values, so null (don't care) or a single desired
  // value is sufficient to describe all searches, and there's no need to allow multiple
  // values.

  dataType !== DATA_TYPE_BOOL
);

const getDataType = (fieldDescriptor, path) => get(fieldDescriptor, ['document', ...path.split('/'), configKey, 'dataType']);

const getSearchCompareField = (fieldDescriptor, path) => get(fieldDescriptor, ['document', ...path.split('/'), configKey, 'searchCompareField']);

const getSearchValueTransform = (fieldDescriptor, path) => get(fieldDescriptor, ['document', ...path.split('/'), configKey, 'searchTransform']);

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
      .map((value) => normalizeStringFieldValue(value))
      .filter((value) => !!value);
  }

  if (!filtered || filtered.size === 0) {
    return null;
  }

  if (filtered.size === 1) {
    return filtered.first();
  }

  return filtered;
};

export const normalizeFieldValue = (value) => (
  Immutable.List.isList(value)
    ? normalizeListFieldValue(value)
    : normalizeStringFieldValue(value)
);

export const normalizeBooleanCondition = (fieldDescriptor, condition) => {
  let childConditions = condition.get('value');

  if (childConditions) {
    childConditions = childConditions
      // Gotta do this mutual recursion
      // eslint-disable-next-line no-use-before-define
      .map((childCondition) => normalizeCondition(fieldDescriptor, childCondition))
      .filter((childCondition) => !!childCondition);
  }

  if (childConditions && childConditions.size > 0) {
    if (childConditions.size > 1) {
      return condition.set('value', childConditions);
    }

    return childConditions.get(0);
  }

  return null;
};

export const normalizeGroupCondition = (fieldDescriptor, condition) => {
  const path = condition.get('path');

  if (!path) {
    return null;
  }

  let childCondition = condition.get('value');

  if (!childCondition) {
    return null;
  }

  const childOp = childCondition.get('op');

  if (childOp !== OP_AND && childOp !== OP_OR) {
    // Ensure the child is a boolean operation.

    childCondition = Immutable.Map({
      op: OP_AND,
      value: Immutable.List.of(childCondition),
    });
  }

  // Normalize the child conditions of the child boolean operation.

  let boolChildConditions = childCondition.get('value');

  if (!boolChildConditions) {
    return null;
  }

  boolChildConditions = boolChildConditions
    // Gotta do this mutual recursion
    // eslint-disable-next-line no-use-before-define
    .map((boolChildCondition) => normalizeCondition(fieldDescriptor, boolChildCondition))
    .filter((boolChildCondition) => !!boolChildCondition);

  if (boolChildConditions.size === 0) {
    return null;
  }

  return condition.set('value', childCondition.set('value', boolChildConditions));
};

export const normalizeRangeFieldCondition = (fieldDescriptor, condition) => {
  const path = condition.get('path');

  if (!path) {
    return null;
  }

  let value = condition.get('value');

  if (value) {
    if (!Immutable.List.isList(value)) {
      value = Immutable.List.of(value);
    }

    const startValue = normalizeStringFieldValue(value.get(0));
    const endValue = normalizeStringFieldValue(value.get(1));

    if (!startValue && !endValue) {
      return null;
    }

    const op = condition.get('op');
    const dataType = getDataType(fieldDescriptor, path);

    if (!startValue) {
      let newOp;

      if (dataType === DATA_TYPE_STRUCTURED_DATE) {
        newOp = (op === OP_NOT_RANGE) ? OP_GT : OP_LTC;
      } else {
        newOp = (op === OP_NOT_RANGE) ? OP_GT : OP_LTE;
      }

      return Immutable.Map({
        op: newOp,
        path: condition.get('path'),
        value: endValue,
      });
    }

    if (!endValue) {
      let newOp;

      if (dataType === DATA_TYPE_STRUCTURED_DATE) {
        newOp = (op === OP_NOT_RANGE) ? OP_LT : OP_GTC;
      } else {
        newOp = (op === OP_NOT_RANGE) ? OP_LT : OP_GTE;
      }

      return Immutable.Map({
        op: newOp,
        path: condition.get('path'),
        value: startValue,
      });
    }

    return condition.set('value', Immutable.List([startValue, endValue]));
  }

  return null;
};

export const normalizeFieldCondition = (fieldDescriptor, condition) => {
  const path = condition.get('path');

  if (!path) {
    return null;
  }

  const value = normalizeFieldValue(condition.get('value'));

  if (value) {
    return condition.set('value', value);
  }

  if (operatorExpectsValue(condition.get('op'))) {
    // The operator expects a value, but none were supplied. Remove the condition.
    return null;
  }

  return condition.delete('value');
};

export const isFieldAutocomplete = (fieldDescriptor, path) => {
  let viewType = get(fieldDescriptor, [configKey, 'view', 'type']);

  if (path) {
    viewType = get(fieldDescriptor, ['document', ...path.split('/'), configKey, 'view', 'type']);
  }

  return viewType?.toJSON() === 'AutocompleteInput';
};

export const normalizeCondition = (fieldDescriptor, condition) => {
  if (condition) {
    const operator = condition.get('op');

    switch (operator) {
      case OP_AND:
      case OP_OR:
        return normalizeBooleanCondition(fieldDescriptor, condition);
      case OP_RANGE:
      case OP_NOT_RANGE:
        return normalizeRangeFieldCondition(fieldDescriptor, condition);
      case OP_GROUP:
        return normalizeGroupCondition(fieldDescriptor, condition);
      default:
        return normalizeFieldCondition(fieldDescriptor, condition);
    }
  }

  return null;
};

export const patternValueToNXQL = (value) => {
  if (!value) {
    return value;
  }

  return value.replace(/(^|(\\\\)+|[^\\])\*+/g, '$1%');
};

const isComparisonOp = (op) => (
  op === OP_LT
  || op === OP_LTE
  || op === OP_GT
  || op === OP_GTE
  || op === OP_RANGE
  || op === OP_NOT_RANGE
);

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
  [OP_NULL]: 'IS NULL',
  [OP_NOT_EQ]: '<>',
  [OP_NOT_MATCH]: 'NOT ILIKE',
  [OP_NOT_RANGE]: 'NOT BETWEEN',
  [OP_NOT_NULL]: 'IS NOT NULL',
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
    const repeating = get(fieldConfig, 'repeating');

    nxqlPathInPartArray.push(repeating ? '*' : fieldName);
  }

  const nxqlPath = nxqlPathInPartArray.join('/');

  return `${nxqlPartName}:${nxqlPath}`;
};

export const operatorToNXQL = (operator) => operatorToNXQLMap[operator];

export const dateStartTimestamp = (value) => ((value.indexOf('T') < 0) ? `${value}T00:00:00.000` : value);

export const dateEndTimestamp = (value) => ((value.indexOf('T') < 0) ? `${value}T23:59:59.999` : value);

export const valueToNXQL = (value, path, fieldDescriptor) => {
  const dataType = getDataType(fieldDescriptor, path) || DATA_TYPE_STRING;
  const searchValueTransform = getSearchValueTransform(fieldDescriptor, path);

  let data = value;

  if (searchValueTransform) {
    data = searchValueTransform({ data: value });
  }

  let nxqlValue;

  if (dataType === DATA_TYPE_DATETIME) {
    // Timestamp values in searches must be given in UTC.
    // Assume timezoneless values are given in local time.

    nxqlValue = (new Date(Date.parse(data))).toISOString();

    return `TIMESTAMP "${nxqlValue}"`;
  }

  if (dataType === DATA_TYPE_DATE) {
    nxqlValue = data;

    // Append zero time part to date-only timestamps.

    nxqlValue = nxqlValue.includes('T') ? nxqlValue : `${nxqlValue}T00:00:00.000`;

    // Timestamp values in searches must be given in UTC.
    // Assume timezoneless values are given in UTC.

    nxqlValue = nxqlValue.endsWith('Z') ? nxqlValue : `${nxqlValue}Z`;

    return `TIMESTAMP "${nxqlValue}"`;
  }

  if (dataType === DATA_TYPE_INT || dataType === DATA_TYPE_FLOAT) {
    nxqlValue = parseFloat(data);
  } else if (dataType === DATA_TYPE_BOOL) {
    const boolData = (typeof data === 'string' && data === 'false' ? false : !!data);

    nxqlValue = boolData ? 1 : 0;
  } else {
    nxqlValue = data;
  }

  return JSON.stringify(nxqlValue);
};

export const booleanConditionToNXQL = (fieldDescriptor, condition, counter) => {
  const operator = condition.get('op');
  const nxqlOp = operatorToNXQL(operator);

  if (nxqlOp) {
    const childConditions = condition.get('value');

    const nxql = childConditions
      .map((childCondition) => (
        // Gotta do this mutual recursion
        // eslint-disable-next-line no-use-before-define
        advancedSearchConditionToNXQL(fieldDescriptor, childCondition, counter)
      ))
      .join(` ${nxqlOp} `);

    return `(${nxql})`;
  }

  return '';
};

const correlatePath = (nxql, nxqlPath, counter) => {
  if (!nxqlPath.endsWith('*')) {
    if (nxqlPath.includes('*')) {
      const index = nxqlPath.lastIndexOf('*');
      return correlatePath(nxql, nxqlPath.substring(0, index + 1), counter);
    }
    return nxql;
  }

  const correlationNumber = counter.next();
  const correlatedPath = `${nxqlPath}${correlationNumber}`;
  const nxqlPathMatchString = nxqlPath.replace(/\*/g, '\\*\\d*');
  const correlatedNXQL = nxql.replace(new RegExp(nxqlPathMatchString, 'g'), correlatedPath);

  const index = nxqlPath.lastIndexOf('*', nxqlPath.length - 2);

  return correlatePath(correlatedNXQL, nxqlPath.substring(0, index + 1), counter);
};

export const groupConditionToNXQL = (fieldDescriptor, condition, counter) => {
  const path = condition.get('path');
  const childCondition = condition.get('value');

  const nxqlPath = pathToNXQL(fieldDescriptor, path);
  // Gotta do this mutual recursion
  // eslint-disable-next-line no-use-before-define
  const nxql = advancedSearchConditionToNXQL(fieldDescriptor, childCondition, counter);

  return correlatePath(nxql, nxqlPath, counter);
};

export const structuredDateFieldConditionToNXQL = (fieldDescriptor, condition, counter) => {
  // Convert structured date searches to searches on the earliest and latest scalar dates.

  // The UI has historically added one day to the latest day when computing the latest scalar
  // date. I don't know why. This has to be taken into account.

  // All conditions that are converted to and/or conditions on the earliest and latest scalar dates
  // need to be correlated to the same group instance, because the field may be repeating. This is
  // done by wrapping them in a group operator.

  const path = condition.get('path');
  const operator = condition.get('op');
  const value = condition.get('value');

  const earliestScalarDatePath = `${path}/dateEarliestScalarValue`;
  const latestScalarDatePath = `${path}/dateLatestScalarValue`;

  const displayDatePath = `${path}/dateDisplayDate`;
  const associationPath = `${path}/dateAssociation`;
  const earliestSingleYearPath = `${path}/dateEarliestSingleYear`;
  const earliestSingleMonthPath = `${path}/dateEarliestSingleMonth`;
  const earliestSingleDayPath = `${path}/dateEarliestSingleDay`;
  const earliestSingleEraPath = `${path}/dateEarliestSingleEra`;
  const earliestSingleCertaintyPath = `${path}/dateEarliestSingleCertainty`;
  const earliestSingleQualifierPath = `${path}/dateEarliestSingleQualifier`;
  const earliestSingleQualifierValuePath = `${path}/dateEarliestSingleQualifierValue`;
  const earliestSingleQualifierUnitPath = `${path}/dateEarliestSingleQualifierUnit`;
  const latestYearPath = `${path}/dateLatestYear`;
  const latestMonthPath = `${path}/dateLatestMonth`;
  const latestDayPath = `${path}/dateLatestDay`;
  const latestEraPath = `${path}/dateLatestEra`;
  const latestCertaintyPath = `${path}/dateLatestCertainty`;
  const latestQualifierPath = `${path}/dateLatestQualifier`;
  const latestQualifierValuePath = `${path}/dateLatestQualifierValue`;
  const latestQualifierUnitPath = `${path}/dateLatestQualifierUnit`;
  const periodPath = `${path}/datePeriod`;
  const notePath = `${path}/dateNote`;
  const earliestScalarValuePath = `${path}/dateEarliestScalarValue`;
  const latestScalarValuePath = `${path}/dateLatestScalarValue`;

  let convertedCondition;

  if (operator === OP_RANGE) {
    // The structured date range overlaps the value range.

    const rangeStart = value.get(0);
    const rangeEnd = value.get(1);

    convertedCondition = Immutable.fromJS({
      path,
      op: OP_GROUP,
      value: {
        op: OP_AND,
        value: [
          {
            path: earliestScalarDatePath,
            op: OP_LTE,
            value: rangeEnd,
          },
          {
            path: latestScalarDatePath,
            op: OP_GT, // Not GTE, because latest scalar date has one day added.
            value: rangeStart,
          },
        ],
      },
    });
  } else if (operator === OP_NULL) {
    convertedCondition = Immutable.fromJS({
      path,
      op: OP_GROUP,
      value: {
        op: OP_AND,
        value: [
          {
            path: displayDatePath,
            op: OP_NULL,
          },
          {
            path: associationPath,
            op: OP_NULL,
          },
          {
            path: earliestSingleYearPath,
            op: OP_NULL,
          },
          {
            path: earliestSingleMonthPath,
            op: OP_NULL,
          },
          {
            path: earliestSingleDayPath,
            op: OP_NULL,
          },
          {
            path: earliestSingleEraPath,
            op: OP_NULL,
          },
          {
            path: earliestSingleCertaintyPath,
            op: OP_NULL,
          },
          {
            path: earliestSingleQualifierPath,
            op: OP_NULL,
          },
          {
            path: earliestSingleQualifierValuePath,
            op: OP_NULL,
          },
          {
            path: earliestSingleQualifierUnitPath,
            op: OP_NULL,
          },
          {
            path: latestYearPath,
            op: OP_NULL,
          },
          {
            path: latestMonthPath,
            op: OP_NULL,
          },
          {
            path: latestDayPath,
            op: OP_NULL,
          },
          {
            path: latestEraPath,
            op: OP_NULL,
          },
          {
            path: latestCertaintyPath,
            op: OP_NULL,
          },
          {
            path: latestQualifierPath,
            op: OP_NULL,
          },
          {
            path: latestQualifierValuePath,
            op: OP_NULL,
          },
          {
            path: latestQualifierUnitPath,
            op: OP_NULL,
          },
          {
            path: periodPath,
            op: OP_NULL,
          },
          {
            path: notePath,
            op: OP_NULL,
          },
          {
            path: earliestScalarValuePath,
            op: OP_NULL,
          },
          {
            path: latestScalarValuePath,
            op: OP_NULL,
          },
        ],
      },
    });
  } else if (operator === OP_NOT_NULL) {
    convertedCondition = Immutable.fromJS({
      path,
      op: OP_GROUP,
      value: {
        op: OP_OR,
        value: [
          {
            path: displayDatePath,
            op: OP_NOT_NULL,
          },
          {
            path: associationPath,
            op: OP_NOT_NULL,
          },
          {
            path: earliestSingleYearPath,
            op: OP_NOT_NULL,
          },
          {
            path: earliestSingleMonthPath,
            op: OP_NOT_NULL,
          },
          {
            path: earliestSingleDayPath,
            op: OP_NOT_NULL,
          },
          {
            path: earliestSingleEraPath,
            op: OP_NOT_NULL,
          },
          {
            path: earliestSingleCertaintyPath,
            op: OP_NOT_NULL,
          },
          {
            path: earliestSingleQualifierPath,
            op: OP_NOT_NULL,
          },
          {
            path: earliestSingleQualifierValuePath,
            op: OP_NOT_NULL,
          },
          {
            path: earliestSingleQualifierUnitPath,
            op: OP_NOT_NULL,
          },
          {
            path: latestYearPath,
            op: OP_NOT_NULL,
          },
          {
            path: latestMonthPath,
            op: OP_NOT_NULL,
          },
          {
            path: latestDayPath,
            op: OP_NOT_NULL,
          },
          {
            path: latestEraPath,
            op: OP_NOT_NULL,
          },
          {
            path: latestCertaintyPath,
            op: OP_NOT_NULL,
          },
          {
            path: latestQualifierPath,
            op: OP_NOT_NULL,
          },
          {
            path: latestQualifierValuePath,
            op: OP_NOT_NULL,
          },
          {
            path: latestQualifierUnitPath,
            op: OP_NOT_NULL,
          },
          {
            path: periodPath,
            op: OP_NOT_NULL,
          },
          {
            path: notePath,
            op: OP_NOT_NULL,
          },
          {
            path: earliestScalarValuePath,
            op: OP_NOT_NULL,
          },
          {
            path: latestScalarValuePath,
            op: OP_NOT_NULL,
          },
        ],
      },
    });
  } else if (operator === OP_NOT_RANGE) {
    // The structured date range does not overlap the value range.
    // This will be the logical negation of OP_RANGE.

    const rangeStart = value.get(0);
    const rangeEnd = value.get(1);

    convertedCondition = Immutable.fromJS({
      path,
      op: OP_GROUP,
      value: {
        op: OP_OR,
        value: [
          {
            path: earliestScalarDatePath,
            op: OP_GT,
            value: rangeEnd,
          },
          {
            path: latestScalarDatePath,
            op: OP_LTE, // Not LT, because latest scalar date has one day added.
            value: rangeStart,
          },
        ],
      },
    });
  } else if (operator === OP_CONTAIN) {
    // The structured date range contains the value date.

    convertedCondition = Immutable.fromJS({
      path,
      op: OP_GROUP,
      value: {
        op: OP_AND,
        value: [
          {
            path: earliestScalarDatePath,
            op: OP_LTE,
            value,
          },
          {
            path: latestScalarDatePath,
            op: OP_GT, // Not GTE, because latest scalar date has one day added.
            value,
          },
        ],
      },
    });
  } else if (operator === OP_NOT_CONTAIN) {
    // The structured date range does not contain the value date.
    // This will be the logical negation of OP_CONTAIN.

    convertedCondition = Immutable.fromJS({
      path,
      op: OP_GROUP,
      value: {
        op: OP_OR,
        value: [
          {
            path: earliestScalarDatePath,
            op: OP_GT,
            value,
          },
          {
            path: latestScalarDatePath,
            op: OP_LTE, // Not LT, because latest scalar date has one day added.
            value,
          },
        ],
      },
    });
  } else if (operator === OP_EQ) {
    // The earliest and latest dates of the structured date are the same, and are equal to the
    // value date.

    convertedCondition = Immutable.fromJS({
      path,
      op: OP_GROUP,
      value: {
        op: OP_AND,
        value: [
          {
            path: earliestScalarDatePath,
            op: OP_EQ,
            value,
          },
          {
            path: latestScalarDatePath,
            op: OP_EQ,
            // GRRR. The latest scalar date has one day added.
            value: moment(value).add(1, 'day').format('YYYY-MM-DD'),
          },
        ],
      },
    });
  } else if (operator === OP_NOT_EQ) {
    // Either the earliest or latest dates of the structured date are not equal to the
    // value date.
    // This will be the logical negation of OP_EQ.

    convertedCondition = Immutable.fromJS({
      path,
      op: OP_GROUP,
      value: {
        op: OP_OR,
        value: [
          {
            path: earliestScalarDatePath,
            op: OP_NOT_EQ,
            value,
          },
          {
            path: latestScalarDatePath,
            op: OP_NOT_EQ,
            // GRRR. The latest scalar date has one day added.
            value: moment(value).add(1, 'day').format('YYYY-MM-DD'),
          },
        ],
      },
    });
  } else if (operator === OP_LT) {
    // The latest date in the structured date is before the value date, i.e. no part of the
    // structured date exists on or after the value.

    convertedCondition = Immutable.fromJS({
      path: latestScalarDatePath,
      op: OP_LTE, // Not LT, because latest scalar date has one day added.
      value,
    });
  } else if (operator === OP_LTC) {
    // The earliest date in the structured date is before or equal to the value date.

    convertedCondition = Immutable.fromJS({
      path: earliestScalarDatePath,
      op: OP_LTE,
      value,
    });
  } else if (operator === OP_GT) {
    // The earliest date in the structured date is after the value date, i.e. no part of the
    // structured date exists on or before the value.

    convertedCondition = Immutable.fromJS({
      path: earliestScalarDatePath,
      op: OP_GT,
      value,
    });
  } else if (operator === OP_GTC) {
    // The latest date in the structured date is after or equal to the value date.

    convertedCondition = Immutable.fromJS({
      path: latestScalarDatePath,
      op: OP_GT, // Not GTE, because latest scalar date has one day added.
      value,
    });
  } else if (operator === OP_COMPLETE) {
    // Both the earliest and latest scalar date are not null.

    convertedCondition = Immutable.fromJS({
      path,
      op: OP_GROUP,
      value: {
        op: OP_AND,
        value: [
          {
            path: earliestScalarDatePath,
            op: OP_NOT_NULL,
          },
          {
            path: latestScalarDatePath,
            op: OP_NOT_NULL,
          },
        ],
      },
    });
  } else if (operator === OP_NOT_COMPLETE) {
    // Either the earliest or latest scalar date is null.
    // This will be the logical negation of OP_COMPLETE.

    convertedCondition = Immutable.fromJS({
      path,
      op: OP_GROUP,
      value: {
        op: OP_OR,
        value: [
          {
            path: earliestScalarDatePath,
            op: OP_NULL,
          },
          {
            path: latestScalarDatePath,
            op: OP_NULL,
          },
        ],
      },
    });
  }

  warning(convertedCondition, `The operator ${operator} is not supported for structured date fields. Search condition will be ignored.`);

  return (
    convertedCondition
      // Gotta do this mutual recursion
      // eslint-disable-next-line no-use-before-define
      ? advancedSearchConditionToNXQL(fieldDescriptor, convertedCondition, counter)
      : null
  );
};

const resolveSearchCompareField = (fieldDescriptor, condition) => {
  const op = condition.get('op');
  const path = condition.get('path');

  if (isComparisonOp(op)) {
    const searchCompareField = getSearchCompareField(fieldDescriptor, path);

    if (searchCompareField) {
      return condition.set('path', searchCompareField);
    }
  }

  return condition;
};

export const rangeFieldConditionToNXQL = (fieldDescriptor, rangeFieldCondition, counter) => {
  const condition = resolveSearchCompareField(fieldDescriptor, rangeFieldCondition);
  const path = condition.get('path');
  const dataType = getDataType(fieldDescriptor, path);

  if (dataType === DATA_TYPE_STRUCTURED_DATE) {
    return structuredDateFieldConditionToNXQL(fieldDescriptor, condition, counter);
  }

  const operator = condition.get('op');
  const values = condition.get('value');

  const nxqlPath = pathToNXQL(fieldDescriptor, path);
  const nxqlOp = operatorToNXQL(operator);

  let startValue = values.get(0);
  let endValue = values.get(1);

  if (dataType === DATA_TYPE_DATETIME) { // } || dataType === DATA_TYPE_DATE) {
    startValue = dateStartTimestamp(startValue);
    endValue = dateEndTimestamp(endValue);
  }

  const nxqlValue = [startValue, endValue]
    .map((value) => valueToNXQL(value, path, fieldDescriptor))
    .join(' AND ');

  return `${nxqlPath} ${nxqlOp} ${nxqlValue}`;
};

export const fieldConditionToNXQL = (fieldDescriptor, fieldCondition, counter) => {
  const condition = resolveSearchCompareField(fieldDescriptor, fieldCondition);
  const path = condition.get('path');
  const dataType = getDataType(fieldDescriptor, path);

  let operator = condition.get('op');
  let value = condition.get('value');

  if (Immutable.List.isList(value)) {
    // Expand or'ed values.

    const orClauses = value.map((valueInstance) => fieldConditionToNXQL(fieldDescriptor, condition.set('value', valueInstance), counter)).join(' OR ');

    return `(${orClauses})`;
  }

  if (dataType === DATA_TYPE_STRUCTURED_DATE) {
    return structuredDateFieldConditionToNXQL(fieldDescriptor, condition, counter);
  }

  if (dataType === DATA_TYPE_DATETIME) { // } || dataType === DATA_TYPE_DATE) {
    if (operator === OP_EQ || operator === OP_NOT_EQ) {
      return rangeFieldConditionToNXQL(
        fieldDescriptor,
        condition
          .set('op', operator === OP_EQ ? OP_RANGE : OP_NOT_RANGE)
          .set('value', Immutable.List([value, value])),
        counter,
      );
    }

    if (operator === OP_GT || operator === OP_LTE) {
      value = dateEndTimestamp(value);
    } else {
      value = dateStartTimestamp(value);
    }
  }

  const isAutocomplete = isFieldAutocomplete(fieldDescriptor, path);

  if (isAutocomplete) {
    if (operator === OP_CONTAIN) {
      operator = OP_MATCH;
      value = `%'%${value}%'%`;
    } else if (operator === OP_NOT_CONTAIN) {
      operator = OP_NOT_MATCH;
      value = `%'%${value}%'%`;
    } else if (operator === OP_MATCH || operator === OP_NOT_MATCH) {
      value = `%'${value}'%`;
    }
  } else if (operator === OP_CONTAIN) {
    operator = OP_MATCH;
    value = `%${value}%`;
  } else if (operator === OP_NOT_CONTAIN) {
    operator = OP_NOT_MATCH;
    value = `%${value}%`;
  }

  if (operator === OP_MATCH || operator === OP_NOT_MATCH) {
    value = patternValueToNXQL(value);
  }

  const nxqlPath = pathToNXQL(fieldDescriptor, path);
  const nxqlOp = operatorToNXQL(operator);

  if (typeof value === 'undefined') {
    return `${nxqlPath} ${nxqlOp}`;
  }

  const nxqlValue = valueToNXQL(value, path, fieldDescriptor);

  return `${nxqlPath} ${nxqlOp} ${nxqlValue}`;
};

export const createCounter = () => {
  let nextNum = 1;

  return {
    next: () => {
      const result = nextNum;

      nextNum += 1;

      return result;
    },
  };
};

export const advancedSearchConditionToNXQL = (fieldDescriptor, condition, counter) => {
  if (condition) {
    const operator = condition.get('op');

    switch (operator) {
      case OP_AND:
      case OP_OR:
        return booleanConditionToNXQL(fieldDescriptor, condition, counter);
      case OP_RANGE:
      case OP_NOT_RANGE:
        return rangeFieldConditionToNXQL(fieldDescriptor, condition, counter);
      case OP_GROUP:
        return groupConditionToNXQL(fieldDescriptor, condition, counter);
      default:
        return fieldConditionToNXQL(fieldDescriptor, condition, counter);
    }
  }

  return null;
};

export const convertAdvancedSearchConditionToNXQL = (fieldDescriptor, condition) => (
  advancedSearchConditionToNXQL(fieldDescriptor, condition, createCounter())
);

/**
 * Converts a search descriptor to a React Router location.
 */
export const searchDescriptorToLocation = (searchDescriptor) => {
  const recordType = searchDescriptor.get('recordType');
  const vocabulary = searchDescriptor.get('vocabulary');
  const csid = searchDescriptor.get('csid');
  const subresource = searchDescriptor.get('subresource');
  const searchQuery = searchDescriptor.get('searchQuery');

  const pathParts = ['/list', recordType, vocabulary, csid, subresource];
  const pathname = pathParts.filter((part) => !!part).join('/');

  const as = searchQuery.get('as');
  const p = searchQuery.get('p');

  const asParam = as
    ? JSON.stringify(as.toJS())
    : undefined;

  const pParam = (typeof p === 'number')
    ? (p + 1).toString()
    : undefined;

  const queryString = qs.stringify(searchQuery.set('as', asParam).set('p', pParam).toJS());

  return {
    pathname,
    search: `?${queryString}`,
  };
};

/**
 * Attempt to derive list type and search type from a search's name and descriptor.
 *
 * @param {*} config the cspace configuration
 * @param {*} searchName the name of the search
 * @param {*} searchDescriptor the search descriptor
 * @returns an object with the listType and searchType set
 */
export const deriveSearchType = (config, searchName, searchDescriptor) => {
  let listType = 'common';
  let searchType = 'default';

  if (searchDescriptor) {
    const recordType = searchDescriptor.get('recordType');
    const subresource = searchDescriptor.get('subresource');

    // there are a few search apis which return different lists, so we account for them first
    // because they should only need the listType.
    // Note that we use the name of the key for the listType (role, account, etc).
    // todo: it would be nice to update the backend to send a single paginated list type instead
    if (SEARCH_RESULT_ACCOUNT_PAGE === searchName) {
      listType = 'account';
    } else if (SEARCH_RESULT_AUTH_ROLE_PAGE === searchName) {
      listType = 'role';
    } else if (subresource) {
      listType = get(config, ['subresources', subresource, 'listType']) || 'common';
    } else if (get(config, ['recordTypes', recordType, 'serviceConfig', 'features', 'updatedSearch'])) {
      listType = 'search';
      searchType = 'advanced';
    }
  }

  return {
    listType,
    searchType,
  };
};

export const getListTypeFromResult = (config, searchResult) => {
  let listType;
  if (searchResult) {
    listType = Object.keys(get(config, ['listTypes'])).find((key) => {
      const listNodeName = get(config, ['listTypes', key, 'listNodeName']);
      return searchResult.has(listNodeName);
    });
  }

  return listType || 'common';
};

/**
 * Returns a search descriptor that describes the next page of the search described by a given
 * descriptor.
 */
export const getNextPageSearchDescriptor = (searchDescriptor) => {
  const p = searchDescriptor.getIn(['searchQuery', 'p']) || 0;

  return searchDescriptor.setIn(['searchQuery', 'p'], p + 1);
};

/**
 * Returns a search descriptor that describes the previous page of the search described by a given
 * descriptor. Null is returned if the given descriptor is on the first page.
 */
export const getPreviousPageSearchDescriptor = (searchDescriptor) => {
  const p = searchDescriptor.getIn(['searchQuery', 'p']) || 0;

  if (p <= 0) {
    return null;
  }

  return searchDescriptor.setIn(['searchQuery', 'p'], p - 1);
};

/**
 * Returns the first item in list result data.
 */
export const getFirstItem = (config, listData, listType = 'common') => {
  if (!listData) {
    return null;
  }

  const listTypeConfig = get(config, ['listTypes', listType]);

  if (!listTypeConfig) {
    return null;
  }

  const {
    listNodeName,
    itemNodeName,
  } = listTypeConfig;

  const items = listData.getIn([listNodeName, itemNodeName]);
  const item = Immutable.List.isList(items) ? items.first() : items;

  return item;
};

/**
 * Returns a name for a search for subrecords.
 */
export const getSubrecordSearchName = (csid, subrecordName) => `subrecord/${csid}/${subrecordName}`;

export const getSearchableRecordTypes = (getAuthorityVocabCsid, config, perms) => {
  const { recordTypes } = config;
  const filteredRecordTypes = {};

  // Filter out record types for which the user doesn't have suffiencient permissions, and
  // vocabularies that don't exist on the server.

  Object.keys(recordTypes).forEach((recordType) => {
    const recordTypeConfig = recordTypes[recordType];
    const serviceType = get(recordTypeConfig, ['serviceConfig', 'serviceType']);

    if (
      serviceType === 'object'
      || serviceType === 'procedure'
    ) {
      // For objects and procedures, check if list permissions exist.

      if (canList(recordType, perms)) {
        filteredRecordTypes[recordType] = recordTypeConfig;
      }
    } else if (serviceType === 'authority') {
      // For authorities, check if list permissions exist, and if so, filter the vocabularies.

      if (canList(recordType, perms)) {
        const { vocabularies } = recordTypeConfig;

        if (vocabularies) {
          const filteredVocabularies = {};

          // Filter out vocabularies that are configured in the UI, but don't exist in the services
          // layer. This will happen when a vocabulary has been configured in the UI, but hasn't
          // been created/initialized through the REST API. This isn't necessarily a bug, because
          // sometimes vocbularies are defined in the UI for convenience, but aren't expected to be
          // created in all tenants.

          Object.keys(vocabularies).forEach((vocabulary) => {
            const vocabularyConfig = vocabularies[vocabulary];
            const { type } = vocabularyConfig;

            // The 'all' vocabulary always exists, so always let that through the filter. For
            // others, check if a csid for the vocabulary was successfully retrieved from the
            // services layer.

            const exists = (type === 'all' || getAuthorityVocabCsid(recordType, vocabulary));

            if (exists) {
              filteredVocabularies[vocabulary] = vocabularyConfig;
            }
          });

          filteredRecordTypes[recordType] = {
            ...recordTypeConfig,
            vocabularies: filteredVocabularies,
          };
        }
      }
    } else {
      // Allow other types. These may get filtered down further by child components.

      filteredRecordTypes[recordType] = recordTypeConfig;
    }
  });

  return filteredRecordTypes;
};

export const clearAdvancedSearchConditionValues = (condition) => {
  if (!condition) {
    return condition;
  }

  const op = condition.get('op');
  const value = condition.get('value');

  if (op === OP_AND || op === OP_OR) {
    if (Immutable.List.isList(value)) {
      return condition.set('value', value.map(
        (childCondition) => clearAdvancedSearchConditionValues(childCondition),
      ));
    }

    return condition.set('value', clearAdvancedSearchConditionValues(value));
  }

  if (op === OP_GROUP) {
    return condition.set('value', clearAdvancedSearchConditionValues(value));
  }

  return condition.delete('value');
};

/**
 * Creates a reusable page size change handler that updates URL query parameters and navigation
 * history. This function handles the common pattern of resetting to page 1 and updating the
 * page size in the URL.
 */
export const createPageSizeChangeHandler = ({
  history,
  location,
  dispatch,
  setPreferredPageSize,
  maxPageSize = 2500,
  minPageSize = 1,
}) => (pageSize) => {
  // Normalize page size
  let normalizedPageSize = parseInt(pageSize, 10);

  if (Number.isNaN(normalizedPageSize) || normalizedPageSize < minPageSize) {
    normalizedPageSize = minPageSize;
  } else if (normalizedPageSize > maxPageSize) {
    normalizedPageSize = maxPageSize;
  }

  if (dispatch && setPreferredPageSize) {
    dispatch(() => setPreferredPageSize(normalizedPageSize));
  }

  if (history && location) {
    const { search } = location;
    const query = qs.parse(search.substring(1));

    query.p = '1';
    query.size = normalizedPageSize.toString();

    const queryString = qs.stringify(query);

    history.push({
      pathname: location.pathname,
      search: `?${queryString}`,
      state: location.state,
    });
  }

  return normalizedPageSize;
};

/**
 * Creates a reusable page change handler that updates URL query parameters and navigation
 * history. This function handles navigation between pages while preserving other query
 * parameters.
 */
export const createPageChangeHandler = ({
  history,
  location,
  zeroIndexed = true,
}) => (page) => {
  if (!history || !location) {
    return;
  }

  const { search } = location;

  const query = qs.parse(search.substring(1));

  // Convert page number based on indexing (URL uses 1-based, internal logic may use 0-based)
  query.p = zeroIndexed ? (page + 1).toString() : page.toString();

  const queryString = qs.stringify(query);

  history.push({
    pathname: location.pathname,
    search: `?${queryString}`,
    state: location.state,
  });
};

export const extractAdvancedSearchGroupedTerms = (searchQuery) => {
  if (searchQuery?.get('op') === OP_AND) {
    const conditions = (searchQuery.get('value'));
    return {
      searchTerms: conditions.get(0),
      limitBy: conditions.get(1),
    };
  }
  return {
    searchTerms: searchQuery,
    limitBy: null,
  };
};
