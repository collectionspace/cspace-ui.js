import messages from '../../../../../src/plugins/recordTypes/organization/messages';

chai.should();

describe('organization record messages', () => {
  it('should contain properties with id and defaultMessage properties', () => {
    messages.should.be.an('object');

    Object.keys(messages).forEach((organizationName) => {
      const organizationMessages = messages[organizationName];

      Object.keys(organizationMessages).forEach((name) => {
        organizationMessages[name].should.contain.all.keys(['id', 'defaultMessage']);
      });
    });
  });
});
