export default (pluginContext) => {
  const {
    AuthorityControlledInput,
    CompoundInput,
    // DateInput,
    // IDGeneratorInput,
    // OptionListControlledInput,
    // StructuredDateInput,
    TextInput,
    // VocabularyControlledInput,
  } = pluginContext.inputComponents;

  const {
    config,
  } = pluginContext.configHelpers.fieldDescriptorKeys;

  return {
    document: {
      [config]: {
        view: {
          type: CompoundInput,
          props: {
            defaultChildSubpath: 'ns2:persons_common',
          },
        },
      },
      'ns2:persons_common': {
        personTermGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          personTermGroup: {
            [config]: {
              view: {
                type: CompoundInput,
                props: {
                  repeating: true,
                },
              },
            },
            termDisplayName: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
            termSource: {
              [config]: {
                view: {
                  type: AuthorityControlledInput,
                  props: {
                    authority: 'citation/local,citation/shared,citation/worldcat',
                  },
                },
              },
            },
          },
        },
      },
    },
  };
};
