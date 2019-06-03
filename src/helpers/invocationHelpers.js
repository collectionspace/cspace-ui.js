import get from 'lodash/get';

const prepareParams = (params) => {
  if (params) {
    const paramPairs = Object.keys(params).map(key => ({
      key,
      value: params[key],
    }));

    if (paramPairs.length > 0) {
      return { param: paramPairs };
    }
  }

  return undefined;
};

export const createInvocationData = (config, invocationDescriptor, params) => {
  const {
    mode,
    recordType: invocationRecordType,
    csid: invocationCsid,
  } = invocationDescriptor.toJS();

  const invocationContext = {
    mode,
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

export default {};
