const loginFormSelector = '.cspace-ui-LoginForm--common';

const getUsernameInput = () => browser.$(loginFormSelector).$('input[name="username"]');
const getPasswordInput = () => browser.$(loginFormSelector).$('input[name="password"]');
const getSubmitButton = () => browser.$(loginFormSelector).$('button[type="submit"]');
const getPromptText = () => browser.$(loginFormSelector).$('p').getText();
const isLoginFormVisible = () => browser.isVisible(loginFormSelector);

const login = (username, password) => {
  getUsernameInput().setValue(username);
  getPasswordInput().setValue([password, 'Enter']);
};

export default () => ({
  getUsernameInput,
  getPasswordInput,
  getSubmitButton,
  getPromptText,
  isLoginFormVisible,
  login,
});
