export default class Notification {
  constructor() {
    this.selector = '.cspace-ui-Notification--common';
  }

  getText() {
    return browser.$(this.selector).getText();
  }
}
