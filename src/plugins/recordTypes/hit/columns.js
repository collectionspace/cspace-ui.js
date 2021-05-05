import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    formatTimestamp,
  } = configContext.formatHelpers;

  return {
    default: {
      hitNumber: {
        messages: defineMessages({
          label: {
            id: 'column.hit.default.hitNumber',
            defaultMessage: 'Held-in-Trust number',
          },
        }),
        order: 10,
        sortBy: 'hits_common:hitNumber',
        width: 200,
      },
      updatedAt: {
        formatValue: formatTimestamp,
        messages: defineMessages({
          label: {
            id: 'column.hit.default.updatedAt',
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
