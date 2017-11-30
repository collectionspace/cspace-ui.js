import loginPage from '../pageObjects/loginPage';
import searchPage from '../pageObjects/searchPage';

describe('when logged out', function suite() {
  beforeEach(() => {
    loginPage.open();

    browser.waitUntil(loginPage.isOpen);

    loginPage.login('admin@core.collectionspace.org', 'Administrator');

    browser.waitUntil(searchPage.isOpen);

    searchPage.logout();
  });

  it('should open the login page when an attempt is made to open a protected page', () => {
    searchPage.open();

    browser.waitUntil(loginPage.isOpen);
  });
});
