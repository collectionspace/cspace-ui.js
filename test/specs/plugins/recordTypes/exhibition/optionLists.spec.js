import optionsList from '../../../../../src/plugins/recordTypes/exhibition/optionLists';

chai.should();

describe('exhibition record optionLists', () => {
  it('should contain properties values and messages', () => {
    optionsList.should.be.an('object');

    Object.keys(optionsList).forEach((option) => {
      const exhibitionOptions = optionsList[option];
      exhibitionOptions.should.contain.all.keys(['values', 'messages']);
    });
  });
});
