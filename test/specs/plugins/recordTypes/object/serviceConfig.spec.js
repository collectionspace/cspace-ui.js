import serviceConfig from '../../../../../src/plugins/recordTypes/object/serviceConfig';

chai.should();

describe('object record serviceConfig', function suite() {
  it('should have servicePath and parts properties', function test() {
    serviceConfig.should.have.property('servicePath').that.is.a('string');
    serviceConfig.should.have.property('parts').that.is.an('object');
  });
});
