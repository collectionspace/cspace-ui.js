import messages from '../../../../../src/plugins/recordTypes/nagpraclaim/messages';

chai.should();

describe('nagpraclaim record messages', () => {
  it('should contain properties with an id and defaultMessage properties', () => {
    messages.should.be.an('object');

    Object.keys(messages).forEach((nagpraclaimName) => {
      const nagpraclaimMessages = messages[nagpraclaimName];

      Object.keys(nagpraclaimMessages).forEach((name) => {
        nagpraclaimMessages[name].should.contain.all.keys(['id', 'defaultMessage']);
      });
    });
  });
});
