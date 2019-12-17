import optionLists from '../../../../../src/plugins/recordTypes/collectionobject/optionLists';

chai.should();

describe('collectionobject record optionLists', () => {
  it('should export an object', () => {
    optionLists.should.be.an('object');
  });
});
