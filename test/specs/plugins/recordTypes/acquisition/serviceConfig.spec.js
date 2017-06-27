import serviceConfig from '../../../../../src/plugins/recordTypes/acquisition/serviceConfig';

chai.should();

describe('acquisition record serviceConfig', function suite() {
  it('should have servicePath property', function test() {
    serviceConfig.should.have.property('servicePath').that.is.a('string');
  });
});
