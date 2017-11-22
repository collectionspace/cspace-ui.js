import * as loginForm from './loginForm';

const url = '/login';
const pageSelector = '.cspace-ui-LoginPage--common';

export const getUsernameInput = () => loginForm.getUsernameInput();

export const getPasswordInput = () => loginForm.getPasswordInput();

export const getSubmitButton = () => loginForm.getSubmitButton();

export const open = () => {
  browser.url(url);
  browser.waitForExist(pageSelector, 5000);
};

export const submit = () => {
  getSubmitButton().click();
};
