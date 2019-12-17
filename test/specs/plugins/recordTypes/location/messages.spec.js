import messages from '../../../../../src/plugins/recordTypes/location/messages';

chai.should();

describe('location record messages', () => {
  it('should contain properties with id and defaultMessage properties', () => {
    messages.should.be.an('object');

    Object.keys(messages).forEach((locationName) => {
      const locationMessages = messages[locationName];

      Object.keys(locationMessages).forEach((name) => {
        locationMessages[name].should.contain.all.keys(['id', 'defaultMessage']);
      });
    });
  });
});
