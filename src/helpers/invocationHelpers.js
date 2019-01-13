import get from 'lodash/get';
import set from 'lodash/set';

const prepareInvocationContext = (invocationContext, params) => {
  if (params) {
    const paramPairs = Object.keys(params).map(key => ({
      key,
      value: params[key],
    }));

    if (paramPairs.length > 0) {
      set(invocationContext, ['params', 'param'], paramPairs);
    }
  }

  return invocationContext;
};

export const createInvocationData = (config, invocationDescriptor, type, name) => {
  const {
    recordType,
    csid: invocationCsid,
    params: paramsJson,
  } = invocationDescriptor;

  const params = paramsJson && JSON.parse(paramsJson);
  const docType = get(config, ['recordTypes', recordType, 'serviceConfig', 'objectName']);

  let invocationContext = {
    docType,
  };

  if (invocationCsid === null || typeof invocationCsid === 'undefined') {
    invocationContext.mode = 'nocontext';
  } else if (Array.isArray(invocationCsid)) {
    invocationContext.mode = 'list';
    invocationContext.listCSIDs = { csid: invocationCsid };
  } else {
    invocationContext.mode = 'single';
    invocationContext.singleCSID = invocationCsid;
  }

  const prepare =
    get(config, ['invocables', type, name, 'prepareInvocationContext'])
    || prepareInvocationContext;

  invocationContext = prepare(invocationContext, params);

  return {
    'ns2:invocationContext': {
      '@xmlns:ns2': 'http://collectionspace.org/services/common/invocable',
      ...invocationContext,
    },
  };
};

export default {};
