import LoginPage from './pageObjects/LoginPage';
import SearchPage from './pageObjects/SearchPage';

describe('when logged out', function suite() {
  const loginPage = new LoginPage();
  const searchPage = new SearchPage();

  beforeEach(() => {
    loginPage.open();
    loginPage.login(testParams.adminUser.username, testParams.adminUser.password);

    searchPage.becomesVisible();
    searchPage.logout();
  });

  it('should open the login page when an attempt is made to open a protected page', () => {
    searchPage.open();

    searchPage.becomesVisible().should.equal(false);

    loginPage.becomesVisible().should.equal(true);
  });
});
