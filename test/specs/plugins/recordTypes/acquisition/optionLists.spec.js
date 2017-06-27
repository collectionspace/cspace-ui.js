import optionLists from '../../../../../src/plugins/recordTypes/acquisition/optionLists';

chai.should();

describe('acquisition record optionLists', function suite() {
  it('should export an object', function test() {
    optionLists.should.be.an('object');
  });
});
