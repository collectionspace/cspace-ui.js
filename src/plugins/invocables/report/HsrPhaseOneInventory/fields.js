import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
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
              id: 'field.report.HsrPhaseOneInventory.Start Location.name',
              defaultMessage: 'Start location',
            },
          }),
          required: true,
          view: {
            type: TextInput,
          },
        },
      },
      'End Location': {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.report.HsrPhaseOneInventory.End Location.name',
              defaultMessage: 'End location',
            },
          }),
          required: true,
          view: {
            type: TextInput,
          },
        },
      },
    },
  };
};
