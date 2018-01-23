import { defineMessages } from 'react-intl';

export default (pluginContext) => {
  const {
    formatRefName,
    formatTimestamp,
  } = pluginContext.formatHelpers;

  return {
    default: {
      title: {
        messages: defineMessages({
          label: {
            id: 'column.group.default.title',
            defaultMessage: 'Title',
          },
        }),
        name: 'title',
        order: 10,
        sortBy: 'groups_common:title',
        width: 250,
      },
      owner: {
        messages: defineMessages({
          label: {
            id: 'column.group.default.owner',
            defaultMessage: 'Owner',
          },
        }),
        formatValue: formatRefName,
        name: 'owner',
        order: 20,
        sortBy: 'groups_common:owner',
        width: 400,
      },
      updatedAt: {
        messages: defineMessages({
          label: {
            id: 'column.group.default.updatedAt',
            defaultMessage: 'Updated',
          },
        }),
        formatValue: formatTimestamp,
        name: 'updatedAt',
        order: 30,
        sortBy: 'collectionspace_core:updatedAt',
        width: 150,
      },
    },
  };
};
