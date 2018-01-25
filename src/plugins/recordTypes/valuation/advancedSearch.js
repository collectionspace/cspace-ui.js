export default (pluginContext) => {
  const {
    OP_OR,
    OP_EQ,
    OP_CONTAIN,
    OP_RANGE,
  } = pluginContext.searchOperators;

  const {
    extensions,
  } = pluginContext.config;

  return {
    op: OP_OR,
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
