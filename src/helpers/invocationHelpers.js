/* global window */

import Immutable from 'immutable';
import get from 'lodash/get';
import qs from 'qs';
import { getFieldDataType, isAutocompleteField, configKey } from './configHelpers';
import { DATA_TYPE_STRUCTURED_DATE } from '../constants/dataTypes';

export const VIEWER_WINDOW_NAME = undefined;

export const storageKey = 'cspace-ui-invocation';

const prepareIncludeFields = (config, recordType, includeFields) => {
  if (includeFields) {
    return {
      field: includeFields.filter((field) => !!field).flatMap((field) => {
        const fieldSegments = field.split('/');

        const fieldDescriptor = get(
          config,
          ['recordTypes', recordType, 'fields', 'document', ...fieldSegments],
        );

        const fieldDataType = fieldDescriptor && getFieldDataType(fieldDescriptor);

        const [schema, ...path] = fieldSegments;
        const partName = schema.substring(schema.indexOf(':') + 1);
        const fieldSpec = `${partName}:${path.join('/')}`;

        if (fieldDataType === DATA_TYPE_STRUCTURED_DATE) {
          // TODO: Do this for export only? Currently don't know at this point if this is an export.
          // Will need an additional arg.

          // For struct date groups, append dateDisplayDate to the field path, and specify the
          // group name as the name. This causes exports to use the group name as the column name,
          // but the display date as the value, which is expected by the converter tool.

          return {
            '@name': fieldSegments[fieldSegments.length - 1],
            '.': `${fieldSpec}/dateDisplayDate`,
          };
        }

        if (isAutocompleteField(fieldDescriptor)) {
          // TODO: Do this for export only. Currently don't know at this point if this is an export.
          // Will need an additional arg.

          // For authority-controlled fields, if values can be sourced from multiple authorities,
          // create a separate column for each authority. This is expected by the converter tool.

          const sourceSpec = get(fieldDescriptor, [configKey, 'view', 'props', 'source']);
          const sources = sourceSpec.split(',');

          if (sources.length > 1) {
            const authorities = {};

            sources.forEach((source) => {
              const [authority] = source.split('/');

              authorities[authority] = true;
            });

            const uniqueAuthorities = Object.keys(authorities);

            if (uniqueAuthorities.length > 1) {
              return uniqueAuthorities.map((authority) => {
                const fieldName = path[path.length - 1];
                const authorityServiceConfig = get(config, ['recordTypes', authority, 'serviceConfig']);
                const authorityObjectName = get(authorityServiceConfig, 'objectName');
                const authorityServicePath = get(authorityServiceConfig, 'servicePath');

                return {
                  '@name': `${fieldName}${authorityObjectName}`,
                  '.': `${fieldSpec}[contains(., ':${authorityServicePath}:')]`,
                };
              });
            }
          }
        }

        return fieldSpec;
      }),
    };
  }

  return undefined;
};

const prepareParams = (params) => {
  if (params) {
    const paramPairs = [];

    Object.keys(params).forEach((key) => {
      const value = params[key];

      if (Array.isArray(value)) {
        value.forEach((v) => paramPairs.push({ key, value: v }));
      } else {
        paramPairs.push({ key, value });
      }
    });

    if (paramPairs.length > 0) {
      return { param: paramPairs };
    }
  }

  return undefined;
};

export const createInvocationData = (config, invocationDescriptor, params) => {
  const {
    includeFields,
    mode,
    outputMIME,
    recordType: invocationRecordType,
    csid: invocationCsid,
  } = invocationDescriptor.toJS();

  const invocationContext = {
    mode,
    outputMIME,
    includeFields: prepareIncludeFields(config, invocationRecordType, includeFields),
    params: prepareParams(params),
    docType: get(config, ['recordTypes', invocationRecordType, 'serviceConfig', 'objectName']),
  };

  if (mode === 'single') {
    invocationContext.singleCSID = invocationCsid;
  } else if (mode === 'list') {
    invocationContext.listCSIDs = { csid: invocationCsid };
  } else if (mode === 'group') {
    invocationContext.groupCSID = invocationCsid;
  }

  return {
    'ns2:invocationContext': {
      '@xmlns:ns2': 'http://collectionspace.org/services/common/invocable',
      ...invocationContext,
    },
  };
};

export const normalizeInvocationDescriptor = (invocationDescriptor, invocationMetadata) => {
  let normalizedInvocationDescriptor = invocationDescriptor;

  if (!normalizedInvocationDescriptor) {
    normalizedInvocationDescriptor = Immutable.Map();
  }

  const outputMIME = normalizedInvocationDescriptor.get('outputMIME');

  if (!outputMIME && invocationMetadata) {
    const defaultOutputMIME = invocationMetadata.getIn(['document', 'ns2:reports_common', 'outputMIME'])
      || 'application/pdf';

    normalizedInvocationDescriptor = normalizedInvocationDescriptor.set('outputMIME', defaultOutputMIME);
  }

  return normalizedInvocationDescriptor;
};

export const getReportViewerPath = (config, reportCsid, invocationDescriptor, reportParams) => {
  const {
    basename,
  } = config;

  const reportParamsJson = reportParams && JSON.stringify(reportParams);

  const queryParams = {
    mode: invocationDescriptor.get('mode'),
    csid: invocationDescriptor.get('csid'),
    outputMIME: invocationDescriptor.get('outputMIME'),
    recordType: invocationDescriptor.get('recordType'),
    params: reportParamsJson,
  };

  return `${basename || ''}/report/${reportCsid}?${qs.stringify(queryParams, { arrayFormat: 'brackets' })}`;
};

// export const getExportViewerPath = (config, invocationDescriptor) => {
//   const {
//     basename,
//   } = config;

//   const csid = invocationDescriptor.get('csid');
//   const includeFields = invocationDescriptor.get('includeFields');

//   const queryParams = {
//     mode: invocationDescriptor.get('mode'),
//     csid: Immutable.List.isList(csid) ? csid.toJS() : csid,
//     outputMIME: invocationDescriptor.get('outputMIME'),
//     recordType: invocationDescriptor.get('recordType'),
//     vocabulary: invocationDescriptor.get('vocabulary'),
//     includeFields: Immutable.List.isList(includeFields) ? includeFields.toJS() : includeFields,
//   };

//   return `${basename || ''}/export?${qs.stringify(queryParams, { arrayFormat: 'brackets' })}`;
// };

export const getExportViewerPath = (config) => {
  const {
    basename,
  } = config;

  return `${basename || ''}/export`;
};

export const storeInvocationDescriptor = (invocationDescriptor) => {
  window.localStorage.setItem(storageKey, JSON.stringify(invocationDescriptor.toJS()));
};

export const loadInvocationDescriptor = (deleteAfterLoad) => {
  const serializedInvocationDescriptor = window.localStorage.getItem(storageKey);

  let invocationDescriptor = null;

  if (serializedInvocationDescriptor) {
    try {
      invocationDescriptor = Immutable.fromJS(JSON.parse(serializedInvocationDescriptor));
    } catch (error) {
      invocationDescriptor = null;
    }
  }

  if (deleteAfterLoad) {
    window.localStorage.removeItem(storageKey);
  }

  return invocationDescriptor;
};
