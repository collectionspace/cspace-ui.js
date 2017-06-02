import optionLists from '../../../../../src/plugins/recordTypes/loanout/optionLists';

chai.should();

describe('loan-out record optionLists', function suite() {
  it('should export an object', function test() {
    optionLists.should.be.an('object');
  });
});
