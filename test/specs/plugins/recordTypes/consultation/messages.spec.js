import messages from '../../../../../src/plugins/recordTypes/consultation/messages';

chai.should();

describe('consultation record messages', () => {
  it('should contain properties with an id and defaultMessage properties', () => {
    messages.should.be.an('object');

    Object.keys(messages).forEach((consultationName) => {
      const consultationMessages = messages[consultationName];

      Object.keys(consultationMessages).forEach((name) => {
        consultationMessages[name].should.contain.all.keys(['id', 'defaultMessage']);
      });
    });
  });
});
