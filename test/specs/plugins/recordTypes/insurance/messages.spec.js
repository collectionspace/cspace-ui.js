import messages from '../../../../../src/plugins/recordTypes/insurance/messages';

chai.should();

describe('insurance record messages', () => {
  it('should contain properties with id and defaultMessage properties', () => {
    messages.should.be.an('object');

    Object.keys(messages).forEach((insuranceName) => {
      const insuranceMessages = messages[insuranceName];

      Object.keys(insuranceMessages).forEach((name) => {
        insuranceMessages[name].should.contain.all.keys(['id', 'defaultMessage']);
      });
    });
  });
});
