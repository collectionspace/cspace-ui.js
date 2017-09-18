import messages from '../../../../../src/plugins/recordTypes/taxon/messages';

chai.should();

describe('taxon record messages', function suite() {
  it('should contain properties with id and defaultMessage properties', function test() {
    messages.should.be.an('object');

    Object.keys(messages).forEach((taxonName) => {
      const taxonMessages = messages[taxonName];

      Object.keys(taxonMessages).forEach((name) => {
        taxonMessages[name].should.contain.all.keys(['id', 'defaultMessage']);
      });
    });
  });
});
