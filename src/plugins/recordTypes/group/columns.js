import { defineMessages } from 'react-intl';

export default (pluginContext) => {
  const {
    formatRefName,
    formatTimestamp,
  } = pluginContext.formatHelpers;

  return {
    default: [
      {
        name: 'title',
        messages: defineMessages({
          label: {
            id: 'column.group.default.title',
            defaultMessage: 'Title',
          },
        }),
        sortBy: 'groups_common:title',
        width: 250,
      },
      {
        name: 'owner',
        messages: defineMessages({
          label: {
            id: 'column.group.default.owner',
            defaultMessage: 'Owner',
          },
        }),
        formatValue: formatRefName,
        sortBy: 'groups_common:owner',
        width: 400,
      },
      {
        name: 'updatedAt',
        messages: defineMessages({
          label: {
            id: 'column.group.default.updatedAt',
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
