import messages from '../../../../../src/plugins/recordTypes/chronology/messages';

chai.should();

describe('chronology record messages', () => {
  it('should contain properties with an id and defaultMessage properties', () => {
    messages.should.be.an('object');

    Object.keys(messages).forEach((chronologyName) => {
      const chronologyMessages = messages[chronologyName];

      Object.keys(chronologyMessages).forEach((name) => {
        chronologyMessages[name].should.contain.all.keys(['id', 'defaultMessage']);
      });
    });
  });
});
