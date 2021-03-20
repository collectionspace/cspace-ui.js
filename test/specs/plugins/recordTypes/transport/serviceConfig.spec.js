import serviceConfig from '../../../../../src/plugins/recordTypes/transport/serviceConfig';

chai.should();

describe('transport record serviceConfig', () => {
  it('should have servicePath property', () => {
    serviceConfig.should.have.property('servicePath').that.is.a('string');
  });
});
