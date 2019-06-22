import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    TextInput,
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
          props: {
            defaultChildSubpath: 'ns2:batch_common',
          },
        },
      },
      'ns2:batch_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/batch',
          },
          view: {
            type: CompoundInput,
          },
        },
        name: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.batch_common.name.name',
                defaultMessage: 'Name',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        notes: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.batch_common.notes.name',
                defaultMessage: 'Description',
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
