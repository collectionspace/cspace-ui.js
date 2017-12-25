import { defineMessages } from 'react-intl';

export default (pluginContext) => {
  const {
    formatRefName,
    formatTimestamp,
  } = pluginContext.formatHelpers;

  return {
    default: [
      {
        name: 'conservationNumber',
        messages: defineMessages({
          label: {
            id: 'column.conservation.default.conservationNumber',
            defaultMessage: 'Reference number',
          },
        }),
        sortBy: 'conservation_common:conservationNumber',
        width: 250,
      },
      {
        name: 'status',
        messages: defineMessages({
          label: {
            id: 'column.conservation.default.status',
            defaultMessage: 'Status',
          },
        }),
        formatValue: formatRefName,
        sortBy: 'conservation_common:conservationStatusGroupList/conservationStatusGroup/0',
        width: 400,
      },
      {
        name: 'updatedAt',
        messages: defineMessages({
          label: {
            id: 'column.conservation.default.updatedAt',
            defaultMessage: 'Updated',
          },
        }),
        formatValue: formatTimestamp,
        sortBy: 'collectionspace_core:updatedAt',
        width: 150,
      },
    ],
  };
};
