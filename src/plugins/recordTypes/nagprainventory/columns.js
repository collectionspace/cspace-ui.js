import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    formatTimestamp,
  } = configContext.formatHelpers;

  return {
    default: {
      inventoryNumber: {
        messages: defineMessages({
          label: {
            id: 'column.nagprainventory.default.inventoryNumber',
            defaultMessage: 'Inventory number',
          },
        }),
        order: 10,
        sortBy: 'nagprainventories_common:inventoryNumber',
        width: 200,
      },
      title: {
        messages: defineMessages({
          label: {
            id: 'column.nagprainventory.default.title',
            defaultMessage: 'Title',
          },
        }),
        order: 20,
        sortBy: 'nagprainventories_common:titles/0',
        width: 450,
      },
      updatedAt: {
        formatValue: formatTimestamp,
        messages: defineMessages({
          label: {
            id: 'column.nagprainventory.default.updatedAt',
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
