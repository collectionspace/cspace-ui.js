import optionsList from '../../../../../src/plugins/recordTypes/audit/optionLists';

chai.should();

describe('audit record optionLists', () => {
  it('should contain event types', () => {
    optionsList.should.be.an('object');

    Object.keys(optionsList).forEach((option) => {
      const eventTypes = optionsList[option];
      eventTypes.should.contain.all.keys([
        'values',
        'messages',
      ]);
    });
  });
});
