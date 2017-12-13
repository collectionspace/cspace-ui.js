export default class Page {
  becomesVisible() {
    try {
      browser.waitUntil(() => this.isVisible());
    } catch (error) {
      return false;
    }

    return true;
  }

  isVisible() {
    if (Array.isArray(this.selector)) {
      const element = this.selector.reduce(
        (result, selector) => (result ? result.$(selector) : null), browser
      );

      return (element ? element.isVisible() : false);
    }

    return browser.isVisible(this.selector);
  }

  open() {
    browser.url(this.url);

    return this.becomesVisible();
  }
}
