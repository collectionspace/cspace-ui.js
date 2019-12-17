import optionsList from '../../../../../src/plugins/recordTypes/conditioncheck/optionLists';

chai.should();

describe('condition check record optionLists', () => {
  it('should contain properties values and messages', () => {
    optionsList.should.be.an('object');

    Object.keys(optionsList).forEach((option) => {
      const conditionCheckOptions = optionsList[option];
      conditionCheckOptions.should.contain.all.keys(['values', 'messages']);
    });
  });
});
