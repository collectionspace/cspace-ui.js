import createConfigContext from '../../../../../src/helpers/createConfigContext';
import advancedSearch from '../../../../../src/plugins/recordTypes/insurance/advancedSearch';

chai.should();

describe('insurance record advanced search', () => {
  const configContext = createConfigContext();

  it('should contain a top level property `op`', () => {
    advancedSearch(configContext).should.have.property('op');
  });

  it('should contain a top level property `value` that is an array', () => {
    advancedSearch(configContext).should.have.property('value').that.is.an('array');
  });

  it('should include a search operation for `insuranceIndemnityReferenceNumber`', () => {
    advancedSearch(configContext).value.should.include({
      op: configContext.searchOperators.OP_CONTAIN,
      path: 'ns2:insurances_common/insuranceIndemnityReferenceNumber',
    });
  });

  it('should include a search operation for `insuranceIndemnityType`', () => {
    advancedSearch(configContext).value.should.include({
      op: configContext.searchOperators.OP_EQ,
      path: 'ns2:insurances_common/insuranceIndemnityType',
    });
  });

  it('should include a search operation for `insurerIndemnifier`', () => {
    advancedSearch(configContext).value.should.include({
      op: configContext.searchOperators.OP_EQ,
      path: 'ns2:insurances_common/insurerIndemnifier',
    });
  });

  it('should include a search operation for `insuranceIndemnityPolicyNumber`', () => {
    advancedSearch(configContext).value.should.include({
      op: configContext.searchOperators.OP_CONTAIN,
      path: 'ns2:insurances_common/insuranceIndemnityPolicyNumber',
    });
  });

  it('should include a search operation for `insuranceIndemnityAuthorizer`', () => {
    advancedSearch(configContext).value.should.include({
      op: configContext.searchOperators.OP_EQ,
      path: 'ns2:insurances_common/insuranceIndemnityAuthorizer',
    });
  });

  it('should include a search operation for `insuranceIndemnityStatus`', () => {
    advancedSearch(configContext).value.should.include({
      op: configContext.searchOperators.OP_EQ,
      path: 'ns2:insurances_common/insuranceIndemnityStatusGroupList/insuranceIndemnityStatusGroup/insuranceIndemnityStatus',
    });
  });

  it('should include a search operation for `insuranceIndemnityStatusDate`', () => {
    advancedSearch(configContext).value.should.include({
      op: configContext.searchOperators.OP_RANGE,
      path: 'ns2:insurances_common/insuranceIndemnityStatusGroupList/insuranceIndemnityStatusGroup/insuranceIndemnityStatusDate',
    });
  });

  it('should include a search operation for `insuranceIndemnityQuoteProvider`', () => {
    advancedSearch(configContext).value.should.include({
      op: configContext.searchOperators.OP_EQ,
      path: 'ns2:insurances_common/quoteProviderGroupList/quoteProviderGroup/insuranceIndemnityQuoteProvider',
    });
  });
});
