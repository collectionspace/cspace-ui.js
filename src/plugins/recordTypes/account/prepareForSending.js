/* global btoa */

export default (data) => {
  // base64 encode password and delete confirmPassword.

  const password = data.getIn(['ns3:accounts_common', 'password']);
  const encodedPassword = btoa(password);

  return data
    .setIn(['ns3:accounts_common', 'password'], encodedPassword)
    .deleteIn(['ns3:accounts_common', 'confirmPassword']);
};
