import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    // AutocompleteInput,
    CompoundInput,
    TextInput,
  } = configContext.inputComponents;

  const {
    configKey: config,
  } = configContext.configHelpers;

  return {
    params: {
      [config]: {
        view: {
          type: CompoundInput,
        },
      },
      'Start Location': {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.report.SystematicInventoryUI.Start Location.name',
              defaultMessage: 'Start location',
            },
          }),
          required: true,
          view: {
            type: TextInput,
            // props: {
            //   source: 'location/local',
            // },
          },
        },
      },
      'End Location': {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.report.SystematicInventoryUI.End Location.name',
              defaultMessage: 'End location',
            },
          }),
          required: true,
          view: {
            type: TextInput,
            // props: {
            //   source: 'location/local',
            // },
          },
        },
      },
    },
  };
};
