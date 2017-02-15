import serviceConfig from '../../../../../src/plugins/recordTypes/collectionobject/serviceConfig';

chai.should();

describe('collectionobject record serviceConfig', function suite() {
  it('should have servicePath property', function test() {
    serviceConfig.should.have.property('servicePath').that.is.a('string');
  });
});
