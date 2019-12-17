import messages from '../../../../../src/plugins/recordTypes/conservation/messages';

chai.should();

describe('conservation record messages', () => {
  it('should contain properties with id and defaultMessage properties', () => {
    messages.should.be.an('object');

    Object.keys(messages).forEach((conservationName) => {
      const conservationMessages = messages[conservationName];

      Object.keys(conservationMessages).forEach((name) => {
        conservationMessages[name].should.contain.all.keys(['id', 'defaultMessage']);
      });
    });
  });
});
