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
    pararms: {
      [config]: {
        view: {
          type: CompoundInput,
        },
      },
      'Agency Name': {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.report.SystematicInventoryUI.Agency Name.name',
              defaultMessage: 'Agency name',
            },
          }),
          view: {
            type: TextInput,
          },
        },
      },
    },
  };
};
