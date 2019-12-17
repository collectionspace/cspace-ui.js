import serviceConfig from '../../../../../src/plugins/recordTypes/conditioncheck/serviceConfig';

chai.should();

describe('condition check record serviceConfig', () => {
  it('should have servicePath property', () => {
    serviceConfig.should.have.property('servicePath').that.is.a('string');
    serviceConfig.should.have.property('serviceName').that.is.a('string');
    serviceConfig.should.have.property('serviceType').that.is.a('string');
    serviceConfig.should.have.property('objectName').that.is.a('string');
    serviceConfig.should.have.property('documentName').that.is.a('string');
  });
});
