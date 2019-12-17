import serviceConfig from '../../../../../src/plugins/recordTypes/collectionobject/serviceConfig';

chai.should();

describe('collectionobject record serviceConfig', () => {
  it('should have servicePath property', () => {
    serviceConfig.should.have.property('servicePath').that.is.a('string');
  });

  it('should have a quickAddData function that returns an object', () => {
    serviceConfig.should.have.property('quickAddData').that.is.a('function');
    serviceConfig.quickAddData({ displayName: 'foo' }).should.be.an('object');
  });
});
