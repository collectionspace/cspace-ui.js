import getSession from './cspace';
import { createInvocationData } from '../helpers/invocationHelpers';

export const invoke = (config, csid, invocationDescriptor) => () => {
  const requestConfig = {
    data: createInvocationData(config, invocationDescriptor),
    responseType: 'blob',
  };

  return getSession().create(`reports/${csid}`, requestConfig);
};

export default {};
