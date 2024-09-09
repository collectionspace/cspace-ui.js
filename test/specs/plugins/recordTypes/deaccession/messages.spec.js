import messages from '../../../../../src/plugins/recordTypes/deaccession/messages';

chai.should();

describe('deaccession record messages', () => {
  it('should contain properties with an id and defaultMessage properties', () => {
    messages.should.be.an('object');

    Object.keys(messages).forEach((deaccessionName) => {
      const deaccessionMessages = messages[deaccessionName];

      Object.keys(deaccessionMessages).forEach((name) => {
        deaccessionMessages[name].should.contain.all.keys(['id', 'defaultMessage']);
      });
    });
  });
});
