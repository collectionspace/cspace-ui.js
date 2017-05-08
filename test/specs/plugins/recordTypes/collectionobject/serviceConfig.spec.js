import serviceConfig from '../../../../../src/plugins/recordTypes/collectionobject/serviceConfig';

chai.should();

describe('collectionobject record serviceConfig', function suite() {
  it('should have servicePath property', function test() {
    serviceConfig.should.have.property('servicePath').that.is.a('string');
  });

  it('should have a quickAddData function that returns an object', function test() {
    serviceConfig.should.have.property('quickAddData').that.is.a('function');
    serviceConfig.quickAddData({ displayName: 'foo' }).should.be.an('object');
  });
});
