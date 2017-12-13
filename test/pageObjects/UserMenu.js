export default class UserMenu {
  constructor() {
    this.selector = '.cspace-ui-UserMenu--common';
  }

  getUserScreenName() {
    const element = browser.$(this.selector);

    if (!element) {
      return undefined;
    }

    const text = element.getText();

    if (text && typeof text === 'string' && text.indexOf('|') >= 0) {
      return text.split('|', 1)[0].trim();
    }

    return undefined;
  }

  getLogoutLink() {
    return browser.$(this.selector).$('a');
  }

  isVisible() {
    return browser.isVisible(this.selector);
  }

  isLoggedInAs(username) {
    return this.isVisible() && this.getUserScreenName() === username;
  }

  logout() {
    this.getLogoutLink().click();

    return this;
  }
}
