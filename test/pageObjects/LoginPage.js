import LoginForm from './LoginForm';
import Page from './Page';

export default class LoginPage extends Page {
  constructor() {
    super();

    this.url = '/login';
    this.selector = '.cspace-ui-LoginPage--common';

    this.loginForm = new LoginForm();
  }

  getPromptText() {
    return this.loginForm.getPromptText();
  }

  setUsername(username) {
    this.loginForm.setUsername(username);

    return this;
  }

  setPassword(password) {
    this.loginForm.setPassword(password);

    return this;
  }

  clickSubmitButton() {
    this.loginForm.clickSubmitButton();

    return this;
  }

  enterUsernameInput() {
    this.loginForm.enterUsernameInput();

    return this;
  }

  enterPasswordInput() {
    this.loginForm.enterPasswordInput();

    return this;
  }

  submit() {
    return this.clickSubmitButton();
  }

  login(username, password) {
    this.loginForm.login(username, password);

    return this;
  }
}
