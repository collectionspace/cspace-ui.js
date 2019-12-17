import getSession from '../helpers/session';

export const readBinary = (path) => () => {
  const config = {
    responseType: 'blob',
  };

  return getSession().read(path, config);
};

export default {};
