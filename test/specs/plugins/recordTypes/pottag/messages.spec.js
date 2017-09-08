import messages from '../../../../../src/plugins/recordTypes/pottag/messages';

chai.should();

describe('pottag record messages', function suite() {
  it('should contain properties with id and defaultMessage properties', function test() {
    messages.should.be.an('object');

    Object.keys(messages).forEach((commonName) => {
      const pottageMessages = messages[commonName];

      Object.keys(pottageMessages).forEach((name) => {
        pottageMessages[name].should.contain.all.keys(['id', 'defaultMessage']);
      });
    });
  });
});
