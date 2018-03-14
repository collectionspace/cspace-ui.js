export default (configContext) => {
  const {
    extensions,
  } = configContext.config;

  return {
    document: {
      ...extensions.core.fields,
    },
  };
};
