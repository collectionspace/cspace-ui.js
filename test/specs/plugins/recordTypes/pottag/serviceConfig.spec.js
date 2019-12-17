import serviceConfig from '../../../../../src/plugins/recordTypes/pottag/serviceConfig';

chai.should();

describe('pottag record serviceConfig', () => {
  it('should have servicePath property', () => {
    serviceConfig.should.have.property('servicePath').that.is.a('string');
  });
});
