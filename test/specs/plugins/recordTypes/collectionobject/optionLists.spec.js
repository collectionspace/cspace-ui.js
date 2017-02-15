import optionLists from '../../../../../src/plugins/recordTypes/collectionobject/optionLists';

chai.should();

describe('collectionobject record optionLists', function suite() {
  it('should export an object', function test() {
    optionLists.should.be.an('object');
  });
});
