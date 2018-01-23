import { defineMessages } from 'react-intl';

export default (pluginContext) => {
  const {
    formatRefName,
    formatTimestamp,
  } = pluginContext.formatHelpers;

  return {
    default: {
      exitNumber: {
        messages: defineMessages({
          label: {
            id: 'column.objectexit.default.exitNumber',
            defaultMessage: 'Exit number',
          },
        }),
        order: 10,
        sortBy: 'objectexit_common:exitNumber',
        width: 200,
      },
      currentOwner: {
        formatValue: formatRefName,
        messages: defineMessages({
          label: {
            id: 'column.objectexit.default.currentOwner',
            defaultMessage: 'Current owner',
          },
        }),
        order: 20,
        sortBy: 'objectexit_common:currentOwner',
        width: 450,
      },
      updatedAt: {
        formatValue: formatTimestamp,
        messages: defineMessages({
          label: {
            id: 'column.objectexit.default.updatedAt',
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
