import LoginPage from './pageObjects/LoginPage';
import ObjectRecordPage from './pageObjects/ObjectRecordPage';
import ProtectedPage from './pageObjects/ProtectedPage';

describe('object record page', function suite() {
  const loginPage = new LoginPage();
  const objectRecordPage = new ObjectRecordPage();
  const protectedPage = new ProtectedPage();

  describe('when logged in as the admin user', () => {
    before(() => {
      loginPage.open();
      loginPage.login(testParams.adminUser.username, testParams.adminUser.password);

      protectedPage.becomesVisible();

      objectRecordPage.open();
      objectRecordPage.becomesVisible();
    });

    after(() => {
      if (protectedPage.isVisible()) {
        protectedPage.logout();
      }
    });

    it('should open', () => {
      objectRecordPage.isVisible().should.equal(true);
    });
  });
});
