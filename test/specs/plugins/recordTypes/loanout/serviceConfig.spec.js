import serviceConfig from '../../../../../src/plugins/recordTypes/loanout/serviceConfig';

chai.should();

describe('loan-out record serviceConfig', function suite() {
  it('should have servicePath property', function test() {
    serviceConfig.should.have.property('servicePath').that.is.a('string');
  });
});
