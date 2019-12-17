import optionsList from '../../../../../src/plugins/recordTypes/valuation/optionLists';

chai.should();

describe('valuation record optionLists', () => {
  it('should contain properties values and messages', () => {
    optionsList.should.be.an('object');

    Object.keys(optionsList).forEach((option) => {
      const valuationOptions = optionsList[option];
      valuationOptions.should.contain.all.keys(['values', 'messages']);
    });
  });
});
