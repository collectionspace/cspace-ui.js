import messages from '../../../../../src/plugins/recordTypes/transport/messages';

chai.should();

describe('transport record messages', () => {
  it('should contain properties with id and defaultMessage properties', () => {
    messages.should.be.an('object');

    Object.keys(messages).forEach((transportName) => {
      const transportMessages = messages[transportName];

      Object.keys(transportMessages).forEach((name) => {
        transportMessages[name].should.contain.all.keys(['id', 'defaultMessage']);
      });
    });
  });
});
