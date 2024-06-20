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
      groupItems: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.batch.Merge Authority Items.groupItems.name',
              defaultMessage: 'Group items',
            },
          }),
          required: true,
          view: {
            type: TextInput,
            props: {
              multiline: true,
            },
          },
        },
      },
    },
  };
};
