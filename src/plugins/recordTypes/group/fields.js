import { defineMessages } from 'react-intl';
import getCoreFields from '../../../helpers/coreFields';

export default (pluginContext) => {
  const {
    AutocompleteInput,
    CompoundInput,
    OptionPickerInput,
    TextInput,
  } = pluginContext.inputComponents;

  const {
    configKey: config,
  } = pluginContext.configHelpers;

  const coreFields = getCoreFields(pluginContext);

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
      // Define core fields
      ...coreFields,
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
