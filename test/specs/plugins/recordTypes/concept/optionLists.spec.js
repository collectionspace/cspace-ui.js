import optionsList from '../../../../../src/plugins/recordTypes/concept/optionLists';

chai.should();

describe('concept record optionLists', function suite() {
  it('should contain properties values and messages', function test() {
    optionsList.should.be.an('object');

    Object.keys(optionsList).forEach((option) => {
      const conceptOptions = optionsList[option];
      conceptOptions.should.contain.all.keys(['values', 'messages']);
    });
  });
});
