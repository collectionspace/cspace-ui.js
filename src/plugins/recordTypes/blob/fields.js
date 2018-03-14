import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    CompoundInput,
    TextInput,
    UploadInput,
  } = configContext.inputComponents;

  const {
    configKey: config,
  } = configContext.configHelpers;

  const {
    extensions,
  } = configContext.config;

  return {
    document: {
      [config]: {
        view: {
          type: CompoundInput,
          props: {
            defaultChildSubpath: 'ns2:blobs_common',
          },
        },
      },
      ...extensions.core.fields,
      'ns2:blobs_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/blob',
          },
        },
        file: {
          [config]: {
            view: {
              type: UploadInput,
            },
          },
        },
        name: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              name: {
                id: 'field.blobs_common.name.name',
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
        length: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              name: {
                id: 'field.blobs_common.length.name',
                defaultMessage: 'Size',
              },
              value: {
                id: 'field.blobs_common.length.value',
                defaultMessage: '{value, number} bytes',
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
        mimeType: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              name: {
                id: 'field.blobs_common.mimeType.name',
                defaultMessage: 'Type',
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
      },
    },
  };
};
