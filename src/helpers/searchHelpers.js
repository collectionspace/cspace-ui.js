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
  NS_PREFIX,
} from './recordDataHelpers';

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
  OP_AND,
  OP_OR,
  OP_EQ,
  OP_GT,
  OP_GTE,
  OP_LT,
  OP_LTE,
  OP_CONTAIN,
  OP_MATCH,
  OP_RANGE,
} from '../constants/searchOperators';

const opsByDataType = {
  [DATA_TYPE_STRING]: [
    OP_EQ,
    OP_CONTAIN,
    OP_MATCH,
    OP_GT,
    OP_GTE,
    OP_LT,
    OP_LTE,
    OP_RANGE,
  ],
  [DATA_TYPE_INT]: [
    OP_EQ,
    OP_GT,
    OP_GTE,
    OP_LT,
    OP_LTE,
    OP_RANGE,
  ],
  [DATA_TYPE_FLOAT]: [
    OP_EQ,
    OP_GT,
    OP_GTE,
    OP_LT,
    OP_LTE,
    OP_RANGE,
  ],
  [DATA_TYPE_BOOL]: [
    OP_EQ,
  ],
  [DATA_TYPE_DATE]: [
    OP_EQ,
    OP_GT,
    OP_GTE,
    OP_LT,
    OP_LTE,
    OP_RANGE,
  ],
  [DATA_TYPE_DATETIME]: [
    OP_EQ,
    OP_GT,
    OP_GTE,
    OP_LT,
    OP_LTE,
    OP_RANGE,
  ],
  [DATA_TYPE_STRUCTURED_DATE]: [
    OP_EQ,
    OP_GT,
    OP_GTE,
    OP_LT,
    OP_LTE,
    OP_RANGE,
  ],
};

// For controlled lists, comparison/range operators will not necessarily produce results that
// users expect, since they are comparing database values/ref names, not display names. Don't
// show those operators on controlled list fields, until we have a way to deal with this.

const controlledListOps = [
  OP_EQ,
];

const getDataType = (fieldDescriptor, path) =>
  get(fieldDescriptor, ['document', ...path.split('/'), configKey, 'dataType']);

const getSearchValueTransform = (fieldDescriptor, path) =>
  get(fieldDescriptor, ['document', ...path.split('/'), configKey, 'searchTransform']);

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

  if (!filtered || filtered.size === 0) {
    return null;
  }

  if (filtered.size === 1) {
    return filtered.first();
  }

  return filtered;
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
  let value = condition.get('value');

  if (value) {
    const path = condition.get('path');
    const dataType = getDataType(fieldDescriptor, path);

    if (!Immutable.List.isList(value)) {
      value = Immutable.List.of(value);
    }

    let startValue = value.get(0);
    let endValue = value.get(1);

    if (dataType === DATA_TYPE_DATETIME || dataType === DATA_TYPE_DATE) {
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

export const normalizePatternValue = (value) => {
  if (!value) {
    return value;
  }

  return value.replace(/(^|(\\\\)+|[^\\])\*+/g, '$1%');
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
    const repeating = get(fieldConfig, 'repeating');

    nxqlPathInPartArray.push(repeating ? '*' : fieldName);
  }

  const nxqlPath = nxqlPathInPartArray.join('/');

  return `${nxqlPartName}:${nxqlPath}`;
};

export const operatorToNXQL = operator => operatorToNXQLMap[operator];

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

  if (dataType === DATA_TYPE_INT) {
    nxqlValue = parseInt(data, 10);
  } else if (dataType === DATA_TYPE_FLOAT) {
    nxqlValue = parseFloat(data);
  } else if (dataType === DATA_TYPE_BOOL) {
    const boolData = (typeof data === 'string' && data === 'false' ? false : !!data);

    nxqlValue = boolData ? 1 : 0;
  } else {
    nxqlValue = data;
  }

  return JSON.stringify(nxqlValue);
};

export const booleanConditionToNXQL = (fieldDescriptor, condition) => {
  const operator = condition.get('op');
  const nxqlOp = operatorToNXQL(operator);

  if (nxqlOp) {
    const childConditions = condition.get('value');

    const nxql =
      childConditions
        .map(childCondition =>
          /* Gotta do this mutual recursion */
          /* eslint-disable no-use-before-define */
          advancedSearchConditionToNXQL(fieldDescriptor, childCondition))
          /* eslint-enable no-use-before-define */
        .join(` ${nxqlOp} `);

    return `(${nxql})`;
  }

  return '';
};

export const structuredDateFieldConditionToNXQL = (fieldDescriptor, condition) => {
  // Convert structured date searches to searches on the earliest and latest scalar dates.

  // The UI has historically added one day to the latest day when computing the latest scalar
  // date. I don't know why. This has to be taken into account.

  const path = condition.get('path');
  const operator = condition.get('op');
  const value = condition.get('value');

  const earliestScalarDatePath = `${path}/dateEarliestScalarValue`;
  const latestScalarDatePath = `${path}/dateLatestScalarValue`;

  let convertedCondition;

  if (operator === OP_RANGE) {
    // The structured date range overlaps the value range.

    const rangeStart = value.get(0);
    const rangeEnd = value.get(1);

    convertedCondition = Immutable.fromJS({
      op: OP_AND,
      value: [
        {
          path: earliestScalarDatePath,
          op: OP_LTE,
          value: rangeEnd,
        },
        {
          path: latestScalarDatePath,
          op: OP_GT,
          value: rangeStart,
        },
      ],
    });
  } else if (operator === OP_CONTAIN) {
    // The structured date range contains the value date.

    convertedCondition = Immutable.fromJS({
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
    });
  } else if (operator === OP_EQ) {
    // The earliest and latest dates of the structured date are the same, and are equal to the
    // value date.

    convertedCondition = Immutable.fromJS({
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
    });
  } else if (operator === OP_LT) {
    // The earliest date in the structured date is before the value date, i.e. some part of the
    // structured date exists before the value.

    convertedCondition = Immutable.fromJS({
      path: earliestScalarDatePath,
      op: OP_LT,
      value,
    });
  } else if (operator === OP_LTE) {
    // The earliest date in the structured date is before or equal to the value date.

    convertedCondition = Immutable.fromJS({
      path: earliestScalarDatePath,
      op: OP_LTE,
      value,
    });
  } else if (operator === OP_GT) {
    // The latest date in the structured date is after the value date, i.e. some part of the
    // structured date exists after the value.

    convertedCondition = Immutable.fromJS({
      path: latestScalarDatePath,
      op: OP_GT,
      // GRRR. The latest scalar date has one day added.
      value: moment(value).add(1, 'day').format('YYYY-MM-DD'),
    });
  } else if (operator === OP_GTE) {
    // The latest date in the structured date is after or equal to the value date.

    convertedCondition = Immutable.fromJS({
      path: latestScalarDatePath,
      op: OP_GT, // Not GTE, because latest scalar date has one day added.
      value,
    });
  }

  warning(convertedCondition, `The operator ${operator} is not supported for structured date fields. Search condition will be ignored.`);

  return (
    convertedCondition
      // eslint-disable-next-line no-use-before-define
      ? advancedSearchConditionToNXQL(fieldDescriptor, convertedCondition)
      : null
  );
};

export const rangeFieldConditionToNXQL = (fieldDescriptor, condition) => {
  const path = condition.get('path');
  const dataType = getDataType(fieldDescriptor, path);

  if (dataType === DATA_TYPE_STRUCTURED_DATE) {
    return structuredDateFieldConditionToNXQL(fieldDescriptor, condition);
  }

  const operator = condition.get('op');
  const values = condition.get('value');

  const nxqlPath = pathToNXQL(fieldDescriptor, path);
  const nxqlOp = operatorToNXQL(operator);

  const startValue = values.get(0);
  const endValue = values.get(1);

  const nxqlValue =
    [startValue, endValue]
      .map(value => valueToNXQL(value, path, fieldDescriptor))
      .join(' AND ');

  return `${nxqlPath} ${nxqlOp} ${nxqlValue}`;
};

export const fieldConditionToNXQL = (fieldDescriptor, condition) => {
  const path = condition.get('path');
  const dataType = getDataType(fieldDescriptor, path);

  let operator = condition.get('op');
  let value = condition.get('value');

  if (Immutable.List.isList(value)) {
    // Expand or'ed values.

    const orClauses = value.map(valueInstance =>
      fieldConditionToNXQL(fieldDescriptor, condition.set('value', valueInstance))
    ).join(' OR ');

    return `(${orClauses})`;
  }

  if (dataType === DATA_TYPE_STRUCTURED_DATE) {
    return structuredDateFieldConditionToNXQL(fieldDescriptor, condition);
  }

  if (operator === OP_CONTAIN) {
    operator = OP_MATCH;
    value = `%${value}%`;
  }

  if (operator === OP_MATCH) {
    value = normalizePatternValue(value);
  }

  const nxqlPath = pathToNXQL(fieldDescriptor, path);
  const nxqlOp = operatorToNXQL(operator);
  const nxqlValue = valueToNXQL(value, path, fieldDescriptor);

  return `${nxqlPath} ${nxqlOp} ${nxqlValue}`;
};

export const advancedSearchConditionToNXQL = (fieldDescriptor, condition) => {
  if (condition) {
    const operator = condition.get('op');

    switch (operator) {
      case OP_AND:
      case OP_OR:
        return booleanConditionToNXQL(fieldDescriptor, condition);
      case OP_RANGE:
        return rangeFieldConditionToNXQL(fieldDescriptor, condition);
      default:
        return fieldConditionToNXQL(fieldDescriptor, condition);
    }
  }

  return null;
};

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
  const pathname = pathParts.filter(part => !!part).join('/');

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

export const getListType = (config, searchDescriptor) => {
  if (searchDescriptor) {
    const subresource = searchDescriptor.get('subresource');

    if (subresource) {
      return get(config, ['subresources', subresource, 'listType']);
    }
  }

  return 'common';
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
      serviceType === 'object' ||
      serviceType === 'procedure'
    ) {
      // For objects and procedures, check if list permissions exist.

      if (canList(recordType, perms)) {
        filteredRecordTypes[recordType] = recordTypeConfig;
      }
    } else if (serviceType === 'authority') {
      // For authorities, check if list permissions exist, and if so, filter the vocabularies.

      if (canList(recordType, perms)) {
        const vocabularies = recordTypeConfig.vocabularies;

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

          filteredRecordTypes[recordType] = Object.assign({}, recordTypeConfig, {
            vocabularies: filteredVocabularies,
          });
        }
      }
    } else {
      // Allow other types. These may get filtered down further by child components.

      filteredRecordTypes[recordType] = recordTypeConfig;
    }
  });

  return filteredRecordTypes;
};

export const getOperatorsForDataType = (dataType = DATA_TYPE_STRING, isControlled) => (
  isControlled ? controlledListOps : (opsByDataType[dataType] || [])
);

export const operatorSupportsMultipleValues = op => (
  // There is no need to support multiple values with greater than/less than operators, since they
  // are redundant. The range search operator could conceivably have multiple values (non-
  // overlapping ranges), but the range search input doesn't support multiple values right now.
  // This could be implemented if it's needed.

  // The below operators allow multiple values.

  op === OP_EQ || op === OP_CONTAIN || op === OP_MATCH
);

export const dataTypeSupportsMultipleValues = dataType => (
  // Booleans only have two possible values, so null (don't care) or a single desired
  // value is sufficient to describe all searches, and there's no need to allow multiple
  // values.

  dataType !== DATA_TYPE_BOOL
);
