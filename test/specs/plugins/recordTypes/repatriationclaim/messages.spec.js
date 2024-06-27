import messages from '../../../../../src/plugins/recordTypes/repatriationclaim/messages';

chai.should();

describe('repatriationclaim record messages', () => {
  it('should contain properties with an id and defaultMessage properties', () => {
    messages.should.be.an('object');

    Object.keys(messages).forEach((repatriationclaimName) => {
      const repatriationclaimMessages = messages[repatriationclaimName];

      Object.keys(repatriationclaimMessages).forEach((name) => {
        repatriationclaimMessages[name].should.contain.all.keys(['id', 'defaultMessage']);
      });
    });
  });
});
