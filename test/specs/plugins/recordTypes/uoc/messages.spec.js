import messages from '../../../../../src/plugins/recordTypes/uoc/messages';

chai.should();

describe('uoc record messages', () => {
  it('should contain properties with id and defaultMessage properties', () => {
    messages.should.be.an('object');

    Object.keys(messages).forEach((uocName) => {
      const uocMessages = messages[uocName];

      Object.keys(uocMessages).forEach((name) => {
        uocMessages[name].should.contain.all.keys(['id', 'defaultMessage']);
      });
    });
  });
});
