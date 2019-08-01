import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    AutocompleteInput,
    CompoundInput,
  } = configContext.inputComponents;

  const {
    configKey: config,
  } = configContext.configHelpers;

  return {
    document: {
      [config]: {
        view: {
          type: CompoundInput,
        },
      },
      startLocation: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.report.systematicInventory.startLocation.name',
              defaultMessage: 'From location',
            },
          }),
          required: true,
          view: {
            type: AutocompleteInput,
            props: {
              showQuickAdd: false,
              source: 'location/local,location/offsite',
            },
          },
        },
      },
      endLocation: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.report.systematicInventory.endLocation.name',
              defaultMessage: 'To location',
            },
          }),
          required: true,
          view: {
            type: AutocompleteInput,
            props: {
              showQuickAdd: false,
              source: 'location/local,location/offsite',
            },
          },
        },
      },
    },
  };
};
