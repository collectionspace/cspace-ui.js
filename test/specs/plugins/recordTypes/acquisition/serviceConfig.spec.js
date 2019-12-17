import serviceConfig from '../../../../../src/plugins/recordTypes/acquisition/serviceConfig';

chai.should();

describe('acquisition record serviceConfig', () => {
  it('should have servicePath property', () => {
    serviceConfig.should.have.property('servicePath').that.is.a('string');
  });
});
