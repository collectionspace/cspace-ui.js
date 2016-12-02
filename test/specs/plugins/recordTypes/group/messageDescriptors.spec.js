import messageDescriptors from '../../../../../src/plugins/recordTypes/group/messageDescriptors';

chai.should();

describe('group record messageDescriptors', function suite() {
  it('should contain properties with id and defaultMessage properties', function test() {
    messageDescriptors.should.be.an('object');

    Object.keys(messageDescriptors).forEach((name) => {
      messageDescriptors[name].should.contain.all.keys(['id', 'defaultMessage']);
    });
  });
});
