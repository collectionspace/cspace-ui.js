export default class LoginForm {
  constructor() {
    this.selector = '.cspace-ui-LoginForm--common';
  }

  getUsernameInput() {
    return browser.$(this.selector).$('input[name="username"]');
  }

  getPasswordInput() {
    return browser.$(this.selector).$('input[name="password"]');
  }

  getSubmitButton() {
    return browser.$(this.selector).$('button[type="submit"]');
  }

  getPromptText() {
    return browser.$(this.selector).$('p').getText();
  }

  isVisible() {
    return browser.isVisible(this.selector);
  }

  setUsername(username) {
    this.getUsernameInput().setValue(username);

    return this;
  }

  setPassword(password) {
    this.getPasswordInput().setValue(password);

    return this;
  }

  clickSubmitButton() {
    this.getSubmitButton().click();

    return this;
  }

  enterUsernameInput() {
    browser.elementIdValue(this.getUsernameInput().value.ELEMENT, 'Enter');

    return this;
  }

  enterPasswordInput() {
    browser.elementIdValue(this.getPasswordInput().value.ELEMENT, 'Enter');

    return this;
  }

  login(username, password) {
    this.setUsername(username).setPassword([password, 'Enter']);

    return this;
  }
}
