export const isValidPassword = (password) => (
  password
  && password.length >= 8
  && password.length <= 24
);

export default {};
