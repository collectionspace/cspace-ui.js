import { defineMessages } from 'react-intl';

export default (pluginContext) => {
  const {
    formatRefName,
    formatTimestamp,
  } = pluginContext.formatHelpers;

  return {
    default: {
      conservationNumber: {
        messages: defineMessages({
          label: {
            id: 'column.conservation.default.conservationNumber',
            defaultMessage: 'Reference number',
          },
        }),
        order: 10,
        sortBy: 'conservation_common:conservationNumber',
        width: 250,
      },
      status: {
        formatValue: formatRefName,
        messages: defineMessages({
          label: {
            id: 'column.conservation.default.status',
            defaultMessage: 'Status',
          },
        }),
        order: 20,
        sortBy: 'conservation_common:conservationStatusGroupList/0/status',
        width: 400,
      },
      updatedAt: {
        formatValue: formatTimestamp,
        messages: defineMessages({
          label: {
            id: 'column.conservation.default.updatedAt',
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
