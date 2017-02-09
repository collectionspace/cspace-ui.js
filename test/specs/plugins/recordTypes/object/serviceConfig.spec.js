import serviceConfig from '../../../../../src/plugins/recordTypes/object/serviceConfig';

chai.should();

describe('object record serviceConfig', function suite() {
  it('should have servicePath property', function test() {
    serviceConfig.should.have.property('servicePath').that.is.a('string');
  });
});
