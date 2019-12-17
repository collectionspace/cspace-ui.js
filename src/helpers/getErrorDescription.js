import get from 'lodash/get';

const getMessage = (error) => {
  const message = get(error, 'message');
  const data = get(error, ['response', 'data']);

  const parts = [message, typeof data === 'string' ? data : null];

  return parts.filter((part) => !!part).join(': ');
};

export default (error) => {
  const errorMessage = getMessage(error);

  const internalError = error.error;
  const internalErrorMessage = internalError ? getMessage(internalError) : null;

  const parts = [errorMessage, internalErrorMessage];

  return parts.filter((part) => !!part).join(': ');
};
