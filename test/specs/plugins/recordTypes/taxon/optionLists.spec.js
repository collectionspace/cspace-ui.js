import optionsList from '../../../../../src/plugins/recordTypes/taxon/optionLists';

chai.should();

describe('taxon record optionLists', function suite() {
  it('should contain properties values and messages', function test() {
    optionsList.should.be.an('object');

    Object.keys(optionsList).forEach((option) => {
      const taxonOptions = optionsList[option];
      taxonOptions.should.contain.all.keys(['values', 'messages']);
    });
  });
});
