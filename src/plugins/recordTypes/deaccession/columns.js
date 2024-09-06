import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    formatTimestamp,
  } = configContext.formatHelpers;

  return {
    default: {
      deaccessionNumber: {
        messages: defineMessages({
          label: {
            id: 'column.deaccession.default.deaccessionNumber',
            defaultMessage: 'Deaccession number',
          },
        }),
        order: 10,
        sortBy: 'deaccessions_common:deaccessionNumber',
        width: 200,
      },
      // What to do for the second column? deaccession reason?
      updatedAt: {
        formatValue: formatTimestamp,
        messages: defineMessages({
          label: {
            id: 'column.deaccession.default.updatedAt',
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
