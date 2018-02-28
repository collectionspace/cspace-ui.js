export default (pluginContext) => {
  const {
    OP_EQ,
    OP_CONTAIN,
  } = pluginContext.searchOperators;

  const {
    defaultAdvancedSearchBooleanOp,
    extensions,
  } = pluginContext.config;

  return {
    op: defaultAdvancedSearchBooleanOp,
    value: [
      {
        op: OP_CONTAIN,
        path: 'ns2:groups_common/title',
      },
      {
        op: OP_EQ,
        path: 'ns2:groups_common/responsibleDepartment',
      },
      {
        op: OP_EQ,
        path: 'ns2:groups_common/owner',
      },
      ...extensions.core.advancedSearch,
    ],
  };
};
