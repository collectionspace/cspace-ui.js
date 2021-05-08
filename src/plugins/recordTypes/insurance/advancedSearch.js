export default (configContext) => {
  const {
    OP_EQ,
    OP_CONTAIN,
    OP_RANGE,
  } = configContext.searchOperators;

  const {
    defaultAdvancedSearchBooleanOp,
    extensions,
  } = configContext.config;

  return {
    op: defaultAdvancedSearchBooleanOp,
    value: [
      {
        op: OP_CONTAIN,
        path: 'ns2:insurances_common/insuranceIndemnityReferenceNumber',
      },
      {
        op: OP_EQ,
        path: 'ns2:insurances_common/insuranceIndemnityType',
      },
      {
        op: OP_EQ,
        path: 'ns2:insurances_common/insurerIndemnifier',
      },
      {
        op: OP_CONTAIN,
        path: 'ns2:insurances_common/insuranceIndemnityPolicyNumber',
      },
      {
        op: OP_EQ,
        path: 'ns2:insurances_common/insuranceIndemnityAuthorizer',
      },
      {
        op: OP_EQ,
        path: 'ns2:insurances_common/insuranceIndemnityStatusGroupList/insuranceIndemnityStatusGroup/insuranceIndemnityStatus',
      },
      {
        op: OP_RANGE,
        path: 'ns2:insurances_common/insuranceIndemnityStatusGroupList/insuranceIndemnityStatusGroup/insuranceIndemnityStatusDate',
      },
      {
        op: OP_EQ,
        path: 'ns2:insurances_common/quoteProviderGroupList/quoteProviderGroup/insuranceIndemnityQuoteProvider',
      },
      ...extensions.core.advancedSearch,
    ],
  };
};
