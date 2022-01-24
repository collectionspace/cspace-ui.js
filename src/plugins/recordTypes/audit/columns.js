import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    formatTimestamp,
  } = configContext.formatHelpers;

  return {
    default: {
      principal: {
        messages: defineMessages({
          label: {
            id: 'column.audit.default.updatedBy',
            defaultMessage: 'By',
          },
        }),
        order: 10,
        width: 450,
      },
      eventDate: {
        formatValue: formatTimestamp,
        messages: defineMessages({
          label: {
            id: 'column.audit.default.updatedAt',
            defaultMessage: 'Updated',
          },
        }),
        order: 30,
        width: 150,
      },
    },
  };
};
