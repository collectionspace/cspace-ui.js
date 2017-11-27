import get from 'lodash/get';

export const createInvocationData = (config, invocationDescriptor) => {
  const {
    recordType,
    csid: invocationCsid,
  } = invocationDescriptor;

  const docType = get(config, ['recordTypes', recordType, 'serviceConfig', 'objectName']);

  const invocationContext = {
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

  return {
    'ns2:invocationContext': {
      '@xmlns:ns2': 'http://collectionspace.org/services/common/invocable',
      ...invocationContext,
    },
  };
};

export default {};
