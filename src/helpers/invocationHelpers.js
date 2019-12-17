import Immutable from 'immutable';
import get from 'lodash/get';

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
    mode,
    outputMIME,
    recordType: invocationRecordType,
    csid: invocationCsid,
  } = invocationDescriptor.toJS();

  const invocationContext = {
    mode,
    outputMIME,
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
