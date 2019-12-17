import messages from '../../../../../src/plugins/recordTypes/work/messages';

chai.should();

describe('work record messages', () => {
  it('should contain properties with id and defaultMessage properties', () => {
    messages.should.be.an('object');

    Object.keys(messages).forEach((workName) => {
      const workMessages = messages[workName];

      Object.keys(workMessages).forEach((name) => {
        workMessages[name].should.contain.all.keys(['id', 'defaultMessage']);
      });
    });
  });
});
