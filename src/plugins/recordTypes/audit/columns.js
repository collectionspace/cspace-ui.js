import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    formatTimestamp,
  } = configContext.formatHelpers;

  return {
    default: {
      updatedBy: {
        messages: defineMessages({
          label: {
            id: 'column.audit.default.updatedBy',
            defaultMessage: 'By',
          },
        }),
        order: 10,
        sortBy: 'audits_common:updatedBy',
        width: 200,
      },
      updatedAt: {
        formatValue: formatTimestamp,
        messages: defineMessages({
          label: {
            id: 'column.audit.default.updatedAt',
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
