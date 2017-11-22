import * as loginPage from '../pageObjects/loginPage';
import * as searchPage from '../pageObjects/searchPage';

describe('Login page', function suite() {
  it('should open the search page when valid credentials are entered', function test() {
    loginPage.open();
    loginPage.getUsernameInput().setValue('admin@core.collectionspace.org');
    loginPage.getPasswordInput().setValue('Administrator');
    loginPage.submit();

    browser.waitUntil(searchPage.isOpen, 5000, 'search page did not open');
  });
});
