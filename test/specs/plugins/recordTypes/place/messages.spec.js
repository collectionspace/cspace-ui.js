import messages from '../../../../../src/plugins/recordTypes/place/messages';

chai.should();

describe('place record messages', () => {
  it('should contain properties with id and defaultMessage properties', () => {
    messages.should.be.an('object');

    Object.keys(messages).forEach((placeName) => {
      const placeMessages = messages[placeName];

      Object.keys(placeMessages).forEach((name) => {
        placeMessages[name].should.contain.all.keys(['id', 'defaultMessage']);
      });
    });
  });
});
