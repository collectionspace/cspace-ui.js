export default (pluginContext) => {
  const {
    OP_OR,
  } = pluginContext.searchOperators;

  const {
    extensions,
  } = pluginContext.config;

  return {
    op: OP_OR,
    value: extensions.core.advancedSearch,
  };
};
