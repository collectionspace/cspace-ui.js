import messages from '../../../../../src/plugins/recordTypes/summarydocumentation/messages';

chai.should();

describe('summarydocumentation record messages', () => {
  it('should contain properties with an id and defaultMessage properties', () => {
    messages.should.be.an('object');

    Object.keys(messages).forEach((summarydocumentationName) => {
      const summarydocumentationMessages = messages[summarydocumentationName];

      Object.keys(summarydocumentationMessages).forEach((name) => {
        summarydocumentationMessages[name].should.contain.all.keys(['id', 'defaultMessage']);
      });
    });
  });
});
