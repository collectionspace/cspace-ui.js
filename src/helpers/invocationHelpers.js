import Immutable from 'immutable';
import get from 'lodash/get';
import qs from 'qs';

export const VIEWER_WINDOW_NAME = undefined;

const prepareIncludeFields = (includeFields) => {
  if (includeFields) {
    return {
      field: includeFields.filter((field) => !!field).map((field) => {
        const [schema, ...path] = field.split('/');
        const partName = schema.substring(schema.indexOf(':') + 1);

        return `${partName}:${path.join('/')}`;
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
    includeFields: prepareIncludeFields(includeFields),
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

  return `${basename || ''}/report/${reportCsid}?${qs.stringify(queryParams)}`;
};

export const getExportViewerPath = (config, invocationDescriptor) => {
  const {
    basename,
  } = config;

  const queryParams = {
    mode: invocationDescriptor.get('mode'),
    csid: invocationDescriptor.get('csid').toJS(),
    outputMIME: invocationDescriptor.get('outputMIME'),
    recordType: invocationDescriptor.get('recordType'),
    vocabulary: invocationDescriptor.get('vocabulary'),
    includeFields: invocationDescriptor.get('includeFields').toJS(),
  };

  return `${basename || ''}/export?${qs.stringify(queryParams)}`;
};
