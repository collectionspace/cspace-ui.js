import serviceConfig from '../../../../../src/plugins/recordTypes/loanin/serviceConfig';

chai.should();

describe('loan-in record serviceConfig', () => {
  it('should have servicePath property', () => {
    serviceConfig.should.have.property('servicePath').that.is.a('string');
  });
});
