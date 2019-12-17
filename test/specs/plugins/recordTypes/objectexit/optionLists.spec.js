import optionsList from '../../../../../src/plugins/recordTypes/objectexit/optionLists';

chai.should();

describe('object exit record optionLists', () => {
  it('should contain properties values and messages', () => {
    optionsList.should.be.an('object');

    Object.keys(optionsList).forEach((option) => {
      const objectExitOptions = optionsList[option];
      objectExitOptions.should.contain.all.keys(['values', 'messages']);
    });
  });
});
