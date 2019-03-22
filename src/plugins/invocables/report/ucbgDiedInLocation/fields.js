import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    CompoundInput,
    AutocompleteInput,
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
      location: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.report.ucbgDiedInLocation.location.name',
              defaultMessage: 'Location',
            },
          }),
          required: true,
          view: {
            type: AutocompleteInput,
            props: {
              source: 'location/local',
            },
          },
        },
      },
    },
  };
};