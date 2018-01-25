export default (pluginContext) => {
  const {
    extensions,
  } = pluginContext.config;

  return {
    document: {
      ...extensions.core.fields,
    },
  };
};
