import serviceConfig from '../../../../../src/plugins/recordTypes/uoc/serviceConfig';

chai.should();

describe('uoc record serviceConfig', () => {
  it('should have servicePath property', () => {
    serviceConfig.should.have.property('servicePath').that.is.a('string');
  });
});
