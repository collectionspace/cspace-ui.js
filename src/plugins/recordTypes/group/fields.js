export default (pluginContext) => {
  const {
    AuthorityControlledInput,
    CompoundInput,
    OptionListControlledInput,
    TextInput,
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
            defaultChildSubpath: 'ns2:groups_common',
          },
        },
      },
      'ns2:groups_common': {
        title: {
          [config]: {
            ui: {
              type: TextInput,
            },
          },
        },
        responsibleDepartment: {
          [config]: {
            ui: {
              type: OptionListControlledInput,
              props: {
                optionListName: 'departments',
              },
            },
          },
        },
        owner: {
          [config]: {
            ui: {
              type: AuthorityControlledInput,
              props: {
                authority: 'person/local',
              },
            },
          },
        },
        scopeNote: {
          [config]: {
            ui: {
              type: TextInput,
              props: {
                multiline: true,
              },
            },
          },
        },
      },
    },
  };
};
