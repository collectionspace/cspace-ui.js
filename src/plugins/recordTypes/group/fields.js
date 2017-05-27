import { defineMessages } from 'react-intl';

export default (pluginContext) => {
  const {
    AutocompleteInput,
    CompoundInput,
    DateInput,
    OptionPickerInput,
    TextInput,
  } = pluginContext.inputComponents;

  const {
    configKey: config,
  } = pluginContext.configHelpers;

  const {
    DATA_TYPE_DATETIME,
  } = pluginContext.dataTypes;

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
      // TODO: Define core fields in one place.
      'ns2:collectionspace_core': {
        createdAt: {
          [config]: {
            dataType: DATA_TYPE_DATETIME,
            view: {
              type: DateInput,
            },
          },
        },
        createdBy: {
          [config]: {
            view: {
              type: TextInput,
            },
          },
        },
        updatedAt: {
          [config]: {
            dataType: DATA_TYPE_DATETIME,
            messages: defineMessages({
              name: {
                id: 'field.collectionspace_core.updatedAt.name',
                defaultMessage: 'Last updated time',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        updatedBy: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionspace_core.updatedBy.name',
                defaultMessage: 'Last updated by',
              },
            }),
            view: {
              type: TextInput,
            },
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
            messages: defineMessages({
              name: {
                id: 'field.groups_common.title.name',
                defaultMessage: 'Title',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        responsibleDepartment: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.groups_common.responsibleDepartment.name',
                defaultMessage: 'Responsible department',
              },
            }),
            view: {
              type: OptionPickerInput,
              props: {
                source: 'departments',
              },
            },
          },
        },
        owner: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.groups_common.owner.name',
                defaultMessage: 'Group owner',
              },
            }),
            view: {
              type: AutocompleteInput,
              props: {
                source: 'person/local',
              },
            },
          },
        },
        scopeNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.groups_common.scopeNote.name',
                defaultMessage: 'Scope note',
              },
            }),
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
