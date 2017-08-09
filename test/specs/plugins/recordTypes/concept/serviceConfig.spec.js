import serviceConfig from '../../../../../src/plugins/recordTypes/concept/serviceConfig';

chai.should();

describe('concept record serviceConfig', function suite() {
  it('should have servicePath property', function test() {
    serviceConfig.should.have.property('servicePath').that.is.a('string');
    serviceConfig.should.have.property('serviceName').that.is.a('string');
    serviceConfig.should.have.property('serviceType').that.is.a('string');
    serviceConfig.should.have.property('objectName').that.is.a('string');
    serviceConfig.should.have.property('documentName').that.is.a('string');
  });
});
