export default (pluginContext) => {
  const {
    OP_OR,
    OP_EQ,
    OP_CONTAIN,
  } = pluginContext.searchOperators;

  const {
    extensions,
  } = pluginContext.config;

  return {
    op: OP_OR,
    value: [
      {
        op: OP_CONTAIN,
        path: 'ns2:objectexit_common/exitNumber',
      },
      // {
      //   op: OP_RANGE,
      //   path: 'ns2:objectexit_common/exitDateGroup',
      // },
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
