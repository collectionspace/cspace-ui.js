export default (pluginContext) => {
  const {
    AuthorityControlledInput,
    CompoundInput,
    OptionListControlledInput,
    TextInput,
  } = pluginContext.inputComponents;

  const {
    ui,
  } = pluginContext.configHelpers.fieldDescriptorKeys;

  return {
    document: {
      [ui]: {
        type: CompoundInput,
        props: {
          defaultChildSubpath: 'ns2:groups_common',
        },
      },
      'ns2:groups_common': {
        title: {
          [ui]: {
            type: TextInput,
          },
        },
        responsibleDepartment: {
          [ui]: {
            type: OptionListControlledInput,
            props: {
              optionListName: 'departments',
            },
          },
        },
        owner: {
          [ui]: {
            type: AuthorityControlledInput,
            props: {
              authority: 'person/local',
            },
          },
        },
        scopeNote: {
          [ui]: {
            type: TextInput,
            props: {
              multiline: true,
            },
          },
        },
      },
    },
  };
};
