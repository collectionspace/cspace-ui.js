export const getUsernameInput = () =>
  browser.$('.cspace-ui-LoginForm--common input[name="username"]');

export const getPasswordInput = () =>
  browser.$('.cspace-ui-LoginForm--common input[name="password"]');

export const getSubmitButton = () =>
  browser.$('.cspace-ui-LoginForm--common button[type="submit"]');
