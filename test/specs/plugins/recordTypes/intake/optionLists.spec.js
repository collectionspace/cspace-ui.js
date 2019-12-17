import optionsList from '../../../../../src/plugins/recordTypes/intake/optionLists';

chai.should();

describe('intake record optionLists', () => {
  it('should contain properties values and messages', () => {
    optionsList.should.be.an('object');

    Object.keys(optionsList).forEach((option) => {
      const intakeOption = optionsList[option];
      intakeOption.should.contain.all.keys(['values', 'messages']);
    });
  });
});
