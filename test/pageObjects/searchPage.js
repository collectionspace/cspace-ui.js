const url = '/search';
const pageSelector = '.cspace-ui-SearchPage--common';

export const isOpen = () => browser.$$(pageSelector).length > 0;

export const open = () => {
  browser.url(url);
  browser.waitForExist(pageSelector, 5000);
};
