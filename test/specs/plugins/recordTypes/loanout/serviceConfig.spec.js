import serviceConfig from '../../../../../src/plugins/recordTypes/loanout/serviceConfig';

chai.should();

describe('loan-out record serviceConfig', () => {
  it('should have servicePath property', () => {
    serviceConfig.should.have.property('servicePath').that.is.a('string');
  });
});
