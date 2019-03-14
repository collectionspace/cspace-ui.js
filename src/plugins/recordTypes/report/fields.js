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
            defaultChildSubpath: 'ns2:reports_common',
          },
        },
      },
      'ns2:reports_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/report',
          },
          view: {
            type: CompoundInput,
          },
        },
        name: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.reports_common.name.name',
                defaultMessage: 'Name',
              },
            }),
            view: {
              type: TextInput,
              props: {
                readOnly: true,
              },
            },
          },
        },
        filename: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.reports_common.filename.name',
                defaultMessage: 'File name',
              },
            }),
            view: {
              type: TextInput,
              // props: {
              //   readOnly: true,
              // },
            },
          },
        },
      },
    },
  };
};
