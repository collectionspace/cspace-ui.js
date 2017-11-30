const userMenuSelector = '.cspace-ui-UserMenu--common';

const getUserScreenName = () => browser.$(userMenuSelector).getText().split('|', 1)[0].trim();
const getLogoutLink = () => browser.$(userMenuSelector).$('a');
const isUserMenuVisible = () => browser.isVisible(userMenuSelector);

const logout = () => {
  getLogoutLink().click();
};

export default () => ({
  getUserScreenName,
  getLogoutLink,
  isUserMenuVisible,
  logout,
});
