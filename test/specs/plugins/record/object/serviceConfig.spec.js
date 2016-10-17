import serviceConfig from '../../../../../src/plugins/record/object/serviceConfig';

chai.should();

describe('serviceConfig', function suite() {
  it('should have name and parts properties', function test() {
    serviceConfig.should.have.property('name').that.is.a('string');
    serviceConfig.should.have.property('parts').that.is.an('object');
  });
});
