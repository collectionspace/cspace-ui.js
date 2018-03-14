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
        path: 'ns2:objectexit_common/exitNumber',
      },
      {
        op: OP_RANGE,
        path: 'ns2:objectexit_common/exitDateGroup',
      },
      {
        op: OP_EQ,
        path: 'ns2:objectexit_common/exitReason',
      },
      {
        op: OP_EQ,
        path: 'ns2:objectexit_common/exitMethods/exitMethod',
      },
      {
        op: OP_EQ,
        path: 'ns2:objectexit_common/currentOwner',
      },
      {
        op: OP_EQ,
        path: 'ns2:objectexit_common/depositor',
      },
      {
        op: OP_CONTAIN,
        path: 'ns2:objectexit_common/exitNote',
      },
      ...extensions.core.advancedSearch,
    ],
  };
};
