import optionsList from '../../../../../src/plugins/recordTypes/location/optionLists';

chai.should();

describe('location record optionLists', () => {
  it('should contain properties values and messages', () => {
    optionsList.should.be.an('object');

    Object.keys(optionsList).forEach((option) => {
      const locationOptions = optionsList[option];
      locationOptions.should.contain.all.keys(['values', 'messages']);
    });
  });
});
