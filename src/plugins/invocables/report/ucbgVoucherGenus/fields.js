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
      genus: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.report.ucbgVoucherGenus.family.name',
              defaultMessage: 'Genus',
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