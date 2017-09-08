import serviceConfig from '../../../../../src/plugins/recordTypes/pottag/serviceConfig';

chai.should();

describe('pottag record serviceConfig', function suite() {
  it('should have servicePath property', function test() {
    serviceConfig.should.have.property('servicePath').that.is.a('string');
  });
});
