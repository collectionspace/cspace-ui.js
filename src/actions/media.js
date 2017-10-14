import getSession from './cspace';

export const readBinary = path => () => {
  const config = {
    responseType: 'blob',
  };

  return getSession().read(path, config);
};

export default {};
