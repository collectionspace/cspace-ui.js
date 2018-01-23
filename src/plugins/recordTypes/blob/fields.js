import { defineMessages } from 'react-intl';

export default (pluginContext) => {
  const {
    CompoundInput,
    ReadOnlyInput,
    UploadInput,
  } = pluginContext.inputComponents;

  const {
    configKey: config,
  } = pluginContext.configHelpers;

  const {
    extensions,
  } = pluginContext.config;

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
            readOnly: true,
            view: {
              type: ReadOnlyInput,
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
            readOnly: true,
            view: {
              type: ReadOnlyInput,
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
            readOnly: true,
            view: {
              type: ReadOnlyInput,
            },
          },
        },
      },
    },
  };
};
