import optionsList from '../../../../../src/plugins/recordTypes/place/optionLists';

chai.should();

describe('place record optionLists', function suite() {
  it('should contain properties values and messages', function test() {
    optionsList.should.be.an('object');

    Object.keys(optionsList).forEach((option) => {
      const organizationOptions = optionsList[option];
      organizationOptions.should.contain.all.keys(['values', 'messages']);
    });
  });
});
