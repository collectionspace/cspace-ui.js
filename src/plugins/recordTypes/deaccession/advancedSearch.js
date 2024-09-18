export default (configContext) => {
  const {
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
        path: 'ns2:deaccessions_common/deaccessionNumber',
      },
      ...extensions.core.advancedSearch,
    ],
  };
};
