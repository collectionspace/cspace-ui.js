/* global btoa */

export default (data) => {
  // base64 encode password and delete confirmPassword.

  const password = data.getIn(['ns2:accounts_common', 'password']);

  if (!password) {
    return data;
  }

  const encodedPassword = btoa(password);

  return data
    .setIn(['ns2:accounts_common', 'password'], encodedPassword)
    .deleteIn(['ns2:accounts_common', 'confirmPassword']);
};
