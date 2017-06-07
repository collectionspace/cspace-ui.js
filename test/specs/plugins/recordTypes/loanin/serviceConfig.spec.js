import serviceConfig from '../../../../../src/plugins/recordTypes/loanin/serviceConfig';

chai.should();

describe('loan-in record serviceConfig', function suite() {
  it('should have servicePath property', function test() {
    serviceConfig.should.have.property('servicePath').that.is.a('string');
  });
});
