import optionLists from '../../../../../src/plugins/recordTypes/loanin/optionLists';

chai.should();

describe('loan-in record optionLists', function suite() {
  it('should export an object', function test() {
    optionLists.should.be.an('object');
  });
});
