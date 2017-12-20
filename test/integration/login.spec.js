import LoginPage from './pageObjects/LoginPage';
import ProtectedPage from './pageObjects/ProtectedPage';
import SearchPage from './pageObjects/SearchPage';

describe('login', function suite() {
  describe('from the login page', () => {
    const loginPage = new LoginPage();
    const protectedPage = new ProtectedPage();
    const searchPage = new SearchPage();

    beforeEach(() => {
      if (!loginPage.isVisible()) {
        loginPage.open();
      }
    });

    afterEach(() => {
      if (protectedPage.isVisible()) {
        protectedPage.logout();

        loginPage.becomesVisible();
      }
    });

    context('when valid credentials are entered', function context() {
      beforeEach(() => {
        loginPage
          .setUsername(testParams.adminUser.username)
          .setPassword(testParams.adminUser.password);
      });

      it('should open the search page when the submit button is clicked', () => {
        loginPage.clickSubmitButton();

        searchPage.becomesVisible().should.equal(true);
        searchPage.isLoggedInAs(testParams.adminUser.screenName).should.equal(true);
      });

      it('should open the search page when enter is pressed on the username input', () => {
        loginPage.enterUsernameInput();

        searchPage.becomesVisible().should.equal(true);
        searchPage.isLoggedInAs(testParams.adminUser.screenName).should.equal(true);
      });

      it('should open the search page when enter is pressed on the password input', () => {
        loginPage.enterPasswordInput();

        searchPage.becomesVisible().should.equal(true);
        searchPage.isLoggedInAs(testParams.adminUser.screenName).should.equal(true);
      });
    });

    context('when invalid credentials are entered', () => {
      beforeEach(() => {
        loginPage
          .setUsername(testParams.adminUser.username)
          .setPassword(`not ${testParams.adminUser.password}`);
      });

      it('should stay on the login page and show an error message when the credentials are submitted', () => {
        loginPage.submit();

        searchPage.becomesVisible().should.equal(false);

        loginPage.getPromptText().should.contain('Incorrect username/password');
      });
    });
  });
});
