import optionsList from '../../../../../src/plugins/recordTypes/concept/optionLists';

chai.should();

describe('concept record optionLists', () => {
  it('should contain properties values and messages', () => {
    optionsList.should.be.an('object');

    Object.keys(optionsList).forEach((option) => {
      const conceptOptions = optionsList[option];
      conceptOptions.should.contain.all.keys(['values', 'messages']);
    });
  });
});
