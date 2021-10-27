import serviceConfig from '../../../../../src/plugins/recordTypes/audit/serviceConfig';

chai.should();

describe('audit record serviceConfig', () => {
  it('should have servicePath property', () => {
    serviceConfig.should.have.property('servicePath').that.is.a('string');
  });
});
