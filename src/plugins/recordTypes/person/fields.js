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
    ui,
  } = pluginContext.configHelpers.fieldDescriptorKeys;

  return {
    document: {
      [ui]: {
        type: CompoundInput,
        props: {
          defaultChildSubpath: 'ns2:persons_common',
        },
      },
      'ns2:persons_common': {
        personTermGroupList: {
          [ui]: {
            type: CompoundInput,
          },
          personTermGroup: {
            [ui]: {
              type: CompoundInput,
              props: {
                repeating: true,
              },
            },
            termDisplayName: {
              [ui]: {
                type: TextInput,
              },
            },
            termSource: {
              [ui]: {
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
  };
};
