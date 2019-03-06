import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    AutocompleteInput,
    CompoundInput,
    DateInput,
    OptionPickerInput,
    TextInput,
  } = configContext.inputComponents;

  const {
    configKey: config,
  } = configContext.configHelpers;

  const {
    extensions,
  } = configContext.config;

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
      ...extensions.core.fields,
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
            required: true,
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
        groupEarliestSingleDate: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.groups_common.groupEarliestSingleDate.name',
                defaultMessage: 'Earliest/single date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        groupLatestDate: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.groups_common.groupLatestDate.name',
                defaultMessage: 'Latest date',
              },
            }),
            view: {
              type: DateInput,
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
