import getSession from './cspace';

export const requestPasswordReset = (email, tenantId) => () => {
  const config = {
    params: {
      email,
      tid: tenantId,
    },
  };

  return getSession().create('accounts/requestpasswordreset', config);
};

export default {};
