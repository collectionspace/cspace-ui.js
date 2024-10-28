import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    formatTimestamp,
  } = configContext.formatHelpers;

  return {
    default: {
      requestNumber: {
        messages: defineMessages({
          label: {
            id: 'column.repatriationrequest.default.requestNumber',
            defaultMessage: 'Repatriation Request number',
          },
        }),
        order: 10,
        sortBy: 'repatriationrequests_common:requestNumber',
        width: 200,
      },
      title: {
        messages: defineMessages({
          label: {
            id: 'column.repatriationrequest.default.title',
            defaultMessage: 'Repatriation Request title',
          },
        }),
        order: 20,
        sortBy: 'repatriationrequests_common:title',
        width: 200,
      },
      updatedAt: {
        formatValue: formatTimestamp,
        messages: defineMessages({
          label: {
            id: 'column.repatriationrequest.default.updatedAt',
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
