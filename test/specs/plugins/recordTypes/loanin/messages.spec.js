import messages from '../../../../../src/plugins/recordTypes/loanin/messages';

chai.should();

describe('loan-in record messages', () => {
  it('should contain properties with id and defaultMessage properties', () => {
    messages.should.be.an('object');

    Object.keys(messages).forEach((loanInName) => {
      const loanInMessages = messages[loanInName];

      Object.keys(loanInMessages).forEach((name) => {
        loanInMessages[name].should.contain.all.keys(['id', 'defaultMessage']);
      });
    });
  });
});
