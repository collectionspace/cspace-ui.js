import messages from '../../../../../src/plugins/recordTypes/concept/messages';

chai.should();

describe('concept record messages', () => {
  it('should contain properties with id and defaultMessage properties', () => {
    messages.should.be.an('object');

    Object.keys(messages).forEach((conceptName) => {
      const conceptMessages = messages[conceptName];

      Object.keys(conceptMessages).forEach((name) => {
        conceptMessages[name].should.contain.all.keys(['id', 'defaultMessage']);
      });
    });
  });
});
