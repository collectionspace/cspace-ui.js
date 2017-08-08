import optionsList from '../../../../../src/plugins/recordTypes/citation/optionLists';

chai.should();

describe('citation record optionLists', function suite() {
  it('should contain properties values and messages', function test() {
    optionsList.should.be.an('object');

    Object.keys(optionsList).forEach((option) => {
      const citationOptions = optionsList[option];
      citationOptions.should.contain.all.keys(['values', 'messages']);
    });
  });
});
