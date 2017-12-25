import { defineMessages } from 'react-intl';

export default (pluginContext) => {
  const {
    formatRefName,
    formatTimestamp,
  } = pluginContext.formatHelpers;

  return {
    default: [
      {
        name: 'exitNumber',
        messages: defineMessages({
          label: {
            id: 'column.objectexit.default.exitNumber',
            defaultMessage: 'Exit number',
          },
        }),
        sortBy: 'objectexit_common:exitNumber',
        width: 200,
      },
      {
        name: 'currentOwner',
        messages: defineMessages({
          label: {
            id: 'column.objectexit.default.currentOwner',
            defaultMessage: 'Current owner',
          },
        }),
        formatValue: formatRefName,
        sortBy: 'objectexit_common:currentOwner',
        width: 450,
      },
      {
        name: 'updatedAt',
        messages: defineMessages({
          label: {
            id: 'column.objectexit.default.updatedAt',
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
