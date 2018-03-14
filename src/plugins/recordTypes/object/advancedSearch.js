export default (configContext) => {
  const {
    defaultAdvancedSearchBooleanOp,
    extensions,
  } = configContext.config;

  return {
    op: defaultAdvancedSearchBooleanOp,
    value: extensions.core.advancedSearch,
  };
};
