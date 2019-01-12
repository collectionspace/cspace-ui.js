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
      objectNumber: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.report.coreAcquisition.objectNumber.name',
              defaultMessage: 'Identification number',
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
