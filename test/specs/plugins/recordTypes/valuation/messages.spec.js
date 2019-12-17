import messages from '../../../../../src/plugins/recordTypes/valuation/messages';

chai.should();

describe('valuation record messages', () => {
  it('should contain properties with id and defaultMessage properties', () => {
    messages.should.be.an('object');

    Object.keys(messages).forEach((valuationName) => {
      const valuationMessages = messages[valuationName];

      Object.keys(valuationMessages).forEach((name) => {
        valuationMessages[name].should.contain.all.keys(['id', 'defaultMessage']);
      });
    });
  });
});
