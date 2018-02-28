export default (pluginContext) => {
  const {
    defaultAdvancedSearchBooleanOp,
    extensions,
  } = pluginContext.config;

  return {
    op: defaultAdvancedSearchBooleanOp,
    value: extensions.core.advancedSearch,
  };
};
