import messages from '../../../../../src/plugins/recordTypes/heldintrust/messages';

chai.should();

describe('heldintrust record messages', () => {
  it('should contain properties with id and defaultMessage properties', () => {
    messages.should.be.an('object');

    Object.keys(messages).forEach((message) => {
      const heldInTrustMessage = messages[message];

      Object.keys(heldInTrustMessage).forEach((name) => {
        heldInTrustMessage[name].should.contain.all.keys(['id', 'defaultMessage']);
      });
    });
  });
});
