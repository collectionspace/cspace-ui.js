import optionLists from '../../../../../src/plugins/recordTypes/object/optionLists';

chai.should();

describe('object record optionLists', function suite() {
  it('should export an object', function test() {
    optionLists.should.be.an('object');
  });
});
