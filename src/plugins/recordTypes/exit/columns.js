import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    formatRefName,
    formatTimestamp,
  } = configContext.formatHelpers;

  return {
    default: {
      exitNumber: {
        messages: defineMessages({
          label: {
            id: 'column.exit.default.exitNumber',
            defaultMessage: 'Exit number',
          },
        }),
        order: 10,
        sortBy: 'exits_common:exitNumber',
        width: 200,
      },
      owner: {
        formatValue: formatRefName,
        messages: defineMessages({
          label: {
            id: 'column.exit.default.exitOwner',
            defaultMessage: 'Exit owner',
          },
        }),
        order: 20,
        sortBy: 'exits_common:owners/0',
        width: 200,
      },
      updatedAt: {
        formatValue: formatTimestamp,
        messages: defineMessages({
          label: {
            id: 'column.exit.default.updatedAt',
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
