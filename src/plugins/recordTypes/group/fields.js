export default (pluginContext) => {
  const {
    AuthorityControlledInput,
    CompoundInput,
    OptionListControlledInput,
    TextInput,
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
            defaultChildSubpath: 'ns2:groups_common',
          },
        },
      },
      'ns2:groups_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/group',
          },
        },
        title: {
          [config]: {
            view: {
              type: TextInput,
            },
          },
        },
        responsibleDepartment: {
          [config]: {
            view: {
              type: OptionListControlledInput,
              props: {
                optionListName: 'departments',
              },
            },
          },
        },
        owner: {
          [config]: {
            view: {
              type: AuthorityControlledInput,
              props: {
                authority: 'person/local',
              },
            },
          },
        },
        scopeNote: {
          [config]: {
            view: {
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
