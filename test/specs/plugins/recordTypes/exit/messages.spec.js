import messages from '../../../../../src/plugins/recordTypes/exit/messages';

chai.should();

describe('exit record messages', () => {
  it('should contain properties with id and defaultMessage properties', () => {
    messages.should.be.an('object');

    Object.keys(messages).forEach((messageGroup) => {
      const definedMessages = messages[messageGroup];

      Object.keys(definedMessages).forEach((name) => {
        definedMessages[name].should.contain.all.keys(['id', 'defaultMessage']);
      });
    });
  });
});
