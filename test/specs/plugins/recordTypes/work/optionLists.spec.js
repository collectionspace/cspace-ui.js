import optionsList from '../../../../../src/plugins/recordTypes/work/optionLists';

chai.should();

describe('work record optionLists', function suite() {
  it('should contain properties values and messages', function test() {
    optionsList.should.be.an('object');

    Object.keys(optionsList).forEach((option) => {
      const locationOptions = optionsList[option];
      locationOptions.should.contain.all.keys(['values', 'messages']);
    });
  });
});
