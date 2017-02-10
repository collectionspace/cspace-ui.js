export default (pluginContext) => {
  const {
    CompoundInput,
  } = pluginContext.inputComponents;

  const {
    configKey: config,
  } = pluginContext.configHelpers;

  return {
    document: {
      [config]: {
        view: {
          type: CompoundInput,
          props: {
            defaultChildSubpath: 'ns2:media_common',
          },
        },
      },
      'ns2:media_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/media',
          },
        },
      },
    },
  };
};
