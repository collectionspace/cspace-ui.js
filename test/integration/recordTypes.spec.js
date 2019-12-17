import CreatePage from './pageObjects/CreatePage';
import LoginPage from './pageObjects/LoginPage';
import ProtectedPage from './pageObjects/ProtectedPage';

describe('record types', () => {
  const loginPage = new LoginPage();
  const landingPage = new ProtectedPage();

  before(() => {
    loginPage.open();
    loginPage.login(testParams.adminUser.username, testParams.adminUser.password);

    landingPage.becomesVisible();
  });

  context('on the create page', () => {
    const createPage = new CreatePage();

    before(() => {
      landingPage.clickCreateNewLink();

      createPage.becomesVisible();
    });


    testParams.visibleRecordTypes.forEach((recordTypeDescriptor) => {
      const [
        serviceType,
        name,
        displayName,
      ] = recordTypeDescriptor;

      it(`should show a link for the ${serviceType} record named "${name}" with link text "${displayName}"`, () => {
        createPage.hasRecordType({ serviceType, name, displayName }).should.equal(true);
      });
    });

    testParams.visibleVocabularies.forEach((vocabularyDescriptor) => {
      const [
        authorityName,
        name,
        displayName,
      ] = vocabularyDescriptor;

      it(`should show a link for the ${authorityName} vocabulary named "${name}" with link text "${displayName}"`, () => {
        createPage.hasVocabulary({ authorityName, name, displayName }).should.equal(true);
      });
    });

    testParams.hiddenRecordTypes.forEach((recordTypeDescriptor) => {
      const name = recordTypeDescriptor;

      it(`should not show a link for the record named "${name}"`, () => {
        createPage.hasRecordType({ name }).should.equal(false);
      });
    });

    testParams.hiddenVocabularies.forEach((vocabularyDescriptor) => {
      const [
        authorityName,
        name,
      ] = vocabularyDescriptor;

      it(`should not show a link for the ${authorityName} vocabulary named "${name}"`, () => {
        createPage.hasVocabulary({ authorityName, name }).should.equal(false);
      });
    });
  });

  // TODO: Test expected record types appear in search dropdowns and permissions list.
});
