// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#Validation
// eslint-disable-next-line max-len
const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const isValidEmail = email => emailPattern.test(email);

export const isValidPassword = password =>
  (password && password.length >= 8 && password.length <= 24);
