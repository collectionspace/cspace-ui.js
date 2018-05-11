import serviceConfig from '../../../../../src/plugins/recordTypes/uoc/serviceConfig';

chai.should();

describe('uoc record serviceConfig', function suite() {
  it('should have servicePath property', function test() {
    serviceConfig.should.have.property('servicePath').that.is.a('string');
  });
});
