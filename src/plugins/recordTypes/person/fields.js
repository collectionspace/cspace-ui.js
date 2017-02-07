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
        ui: {
          type: CompoundInput,
          props: {
            defaultChildSubpath: 'ns2:persons_common',
          },
        },
      },
      'ns2:persons_common': {
        personTermGroupList: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          personTermGroup: {
            [config]: {
              ui: {
                type: CompoundInput,
                props: {
                  repeating: true,
                },
              },
            },
            termDisplayName: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
            termSource: {
              [config]: {
                ui: {
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
