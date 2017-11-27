import get from 'lodash/get';
import getSession from './cspace';

export const invoke = (config, csid, invocationDescriptor) => () => {
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

  const requestConfig = {
    data: {
      'ns2:invocationContext': {
        '@xmlns:ns2': 'http://collectionspace.org/services/common/invocable',
        ...invocationContext,
      },
    },
    responseType: 'blob',
  };

  return getSession().create(`reports/${csid}`, requestConfig);
};

export default {};
