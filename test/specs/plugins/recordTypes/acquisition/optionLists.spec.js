import optionLists from '../../../../../src/plugins/recordTypes/acquisition/optionLists';

chai.should();

describe('acquisition record optionLists', () => {
  it('should export an object', () => {
    optionLists.should.be.an('object');
  });
});
