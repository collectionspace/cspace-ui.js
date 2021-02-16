export default (configContext) => {
  const {
    OP_EQ,
    OP_CONTAIN,
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
        path: 'ns2:transports_common/transportReferenceNumber',
      },
      {
        op: OP_EQ,
        path: 'ns2:transports_common/courierGroupList/courierGroup/courier',
      },
      ...extensions.core.advancedSearch,
    ],
  };
};
