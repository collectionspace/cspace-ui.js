import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    DATA_TYPE_DATETIME,
  } = configContext.dataTypes;

  const {
    configKey: config,
  } = configContext.configHelpers;

  const {
    TextInput,
    DateInput,
    DateTimeInput,
  } = configContext.inputComponents;

  return {
    'ns2:collectionspace_core': {
      [config]: {
        // The fields in this schema do not appear on any forms, but they should be searchable.
        searchDisabled: false,
      },
      createdAt: {
        [config]: {
          dataType: DATA_TYPE_DATETIME,
          messages: defineMessages({
            name: {
              id: 'field.ext.core.createdAt.name',
              defaultMessage: 'Created time',
            },
          }),
          searchDisabled: false,
          searchView: {
            type: DateInput,
          },
          view: {
            type: DateTimeInput,
            props: {
              readOnly: true,
            },
          },
        },
      },
      createdBy: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.ext.core.createdBy.name',
              defaultMessage: 'Created by',
            },
          }),
          searchDisabled: false,
          view: {
            type: TextInput,
          },
        },
      },
      updatedAt: {
        [config]: {
          dataType: DATA_TYPE_DATETIME,
          messages: defineMessages({
            name: {
              id: 'field.ext.core.updatedAt.name',
              defaultMessage: 'Last updated time',
            },
          }),
          searchDisabled: false,
          searchView: {
            type: DateInput,
          },
          view: {
            type: DateTimeInput,
            props: {
              readOnly: true,
            },
          },
        },
      },
      updatedBy: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.ext.core.updatedBy.name',
              defaultMessage: 'Last updated by',
            },
          }),
          searchDisabled: false,
          view: {
            type: TextInput,
          },
        },
      },
      uri: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.ext.core.uri.name',
              defaultMessage: 'URI',
            },
          }),
          searchDisabled: false,
          view: {
            type: TextInput,
            props: {
              readOnly: true,
            },
          },
        },
      },
    },
  };
};
