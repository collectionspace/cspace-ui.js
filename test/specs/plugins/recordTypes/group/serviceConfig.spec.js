import serviceConfig from '../../../../../src/plugins/recordTypes/group/serviceConfig';

chai.should();

describe('group record serviceConfig', function suite() {
  it('should have servicePath property', function test() {
    serviceConfig.should.have.property('servicePath').that.is.a('string');
  });
});
