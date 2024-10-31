import messages from '../../../../../src/plugins/recordTypes/repatriationrequest/messages';

chai.should();

describe('repatriationrequest record messages', () => {
  it('should contain properties with an id and defaultMessage properties', () => {
    messages.should.be.an('object');

    Object.keys(messages).forEach((repatriationrequestName) => {
      const repatriationrequestMessages = messages[repatriationrequestName];

      Object.keys(repatriationrequestMessages).forEach((name) => {
        repatriationrequestMessages[name].should.contain.all.keys(['id', 'defaultMessage']);
      });
    });
  });
});
