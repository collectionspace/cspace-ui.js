import optionsList from '../../../../../src/plugins/recordTypes/place/optionLists';

chai.should();

describe('place record optionLists', () => {
  it('should contain properties values and messages', () => {
    optionsList.should.be.an('object');

    Object.keys(optionsList).forEach((option) => {
      const placeOptions = optionsList[option];
      placeOptions.should.contain.all.keys(['values', 'messages']);
    });
  });
});
