export default (configContext) => {
  const {
    OP_EQ,
    OP_CONTAIN,
    // OP_RANGE,
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
        path: 'ns2:uoc_common/referenceNumber',
      },
      {
        op: OP_EQ,
        path: 'ns2:uoc_common/authorizedBy',
      },

      ...extensions.core.advancedSearch,
    ],
  };
};
