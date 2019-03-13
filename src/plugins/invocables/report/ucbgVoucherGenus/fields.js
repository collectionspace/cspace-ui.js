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
      family: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.report.ucbgVoucherGenus.family.name',
              defaultMessage: 'Family',
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
