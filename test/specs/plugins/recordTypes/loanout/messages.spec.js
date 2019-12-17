import messages from '../../../../../src/plugins/recordTypes/loanout/messages';

chai.should();

describe('loan-out record messages', () => {
  it('should contain properties with id and defaultMessage properties', () => {
    messages.should.be.an('object');

    Object.keys(messages).forEach((loanOutName) => {
      const loanOutMessages = messages[loanOutName];

      Object.keys(loanOutMessages).forEach((name) => {
        loanOutMessages[name].should.contain.all.keys(['id', 'defaultMessage']);
      });
    });
  });
});
