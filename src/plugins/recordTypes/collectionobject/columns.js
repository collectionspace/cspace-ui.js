import { defineMessages } from 'react-intl';

export default (pluginContext) => {
  const {
    formatTimestamp,
  } = pluginContext.formatHelpers;

  return {
    default: {
      objectNumber: {
        messages: defineMessages({
          label: {
            id: 'column.collectionobject.default.objectNumber',
            defaultMessage: 'Identification number',
          },
        }),
        order: 10,
        sortBy: 'collectionobjects_common:objectNumber',
        width: 200,
      },
      title: {
        messages: defineMessages({
          label: {
            id: 'column.collectionobject.default.title',
            defaultMessage: 'Title',
          },
        }),
        order: 20,
        sortBy: 'collectionobjects_common:titleGroupList/0/title',
        width: 450,
      },
      updatedAt: {
        formatValue: formatTimestamp,
        messages: defineMessages({
          label: {
            id: 'column.collectionobject.default.updatedAt',
            defaultMessage: 'Updated',
          },
        }),
        order: 30,
        sortBy: 'collectionspace_core:updatedAt',
        width: 150,
      },
    },
    narrow: {
      objectNumber: {
        messages: defineMessages({
          label: {
            id: 'column.collectionobject.narrow.objectNumber',
            defaultMessage: 'ID',
          },
        }),
        order: 10,
        sortBy: 'collectionobjects_common:objectNumber',
        width: 200,
      },
      title: {
        messages: defineMessages({
          label: {
            id: 'column.collectionobject.narrow.title',
            defaultMessage: 'Title',
          },
        }),
        order: 20,
        width: 450,
      },
      updatedAt: {
        formatValue: formatTimestamp,
        messages: defineMessages({
          label: {
            id: 'column.collectionobject.narrow.updatedAt',
            defaultMessage: 'Updated',
          },
        }),
        order: 30,
        sortBy: 'collectionspace_core:updatedAt',
        width: 150,
      },
    },
  };
};
