import messages from '../../../../../src/plugins/recordTypes/dutyofcare/messages';

chai.should();

describe('dutyofcare record messages', () => {
  it('should contain properties with an id and defaultMessage properties', () => {
    messages.should.be.an('object');

    Object.keys(messages).forEach((dutyOfCareNmae) => {
      const dutyOfCareMessages = messages[dutyOfCareNmae];

      Object.keys(dutyOfCareMessages).forEach((name) => {
        dutyOfCareMessages[name].should.contain.all.keys(['id', 'defaultMessage']);
      });
    });
  });
});
