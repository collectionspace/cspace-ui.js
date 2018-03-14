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
        path: 'ns2:valuationcontrols_common/valuationcontrolRefNumber',
      },
      {
        op: OP_RANGE,
        path: 'ns2:valuationcontrols_common/valueDate',
      },
      {
        op: OP_RANGE,
        path: 'ns2:valuationcontrols_common/valueRenewalDate',
      },
      {
        op: OP_EQ,
        path: 'ns2:valuationcontrols_common/valueSource',
      },
      {
        op: OP_EQ,
        path: 'ns2:valuationcontrols_common/valueType',
      },
      ...extensions.core.advancedSearch,
    ],
  };
};
