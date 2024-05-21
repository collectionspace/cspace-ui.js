import messages from '../../../../../src/plugins/recordTypes/nagprainventory/messages';

chai.should();

describe('nagprainventory record messages', () => {
  it('should contain properties with an id and defaultMessage properties', () => {
    messages.should.be.an('object');

    Object.keys(messages).forEach((messageType) => {
      const inventoryMessages = messages[messageType];

      Object.keys(inventoryMessages).forEach((name) => {
        inventoryMessages[name].should.contain.all.keys(['id', 'defaultMessage']);
      });
    });
  });
});
