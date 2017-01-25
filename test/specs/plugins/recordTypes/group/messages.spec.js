import messages from '../../../../../src/plugins/recordTypes/group/messages';

chai.should();

describe('group record messages', function suite() {
  it('should contain properties with id and defaultMessage properties', function test() {
    messages.should.be.an('object');

    Object.keys(messages).forEach((groupName) => {
      const groupMessages = messages[groupName];

      Object.keys(groupMessages).forEach((name) => {
        groupMessages[name].should.contain.all.keys(['id', 'defaultMessage']);
      });
    });
  });
});
