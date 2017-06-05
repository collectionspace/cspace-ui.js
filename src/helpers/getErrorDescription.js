import get from 'lodash/get';

export default (error) => {
  const message = get(error, 'message');
  const data = get(error, ['response', 'data']);

  const parts = [message, typeof data === 'string' ? data : null];

  return parts.filter(part => !!part).join(': ');
};
