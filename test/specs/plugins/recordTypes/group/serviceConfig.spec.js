import serviceConfig from '../../../../../src/plugins/recordTypes/group/serviceConfig';

chai.should();

describe('group record serviceConfig', () => {
  it('should have servicePath property', () => {
    serviceConfig.should.have.property('servicePath').that.is.a('string');
  });
});
