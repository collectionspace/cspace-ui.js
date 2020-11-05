import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    formatRefName,
    formatTimestamp,
  } = configContext.formatHelpers;

  return {
    default: {
      referenceNumber: {
        messages: defineMessages({
          label: {
            id: 'column.uoc.default.referenceNumber',
            defaultMessage: 'Reference number',
          },
        }),
        order: 10,
        sortBy: 'uoc_common:referenceNumber',
        width: 200,
      },
      title: {
        messages: defineMessages({
          label: {
            id: 'column.uoc.default.title',
            defaultMessage: 'Title',
          },
        }),
        order: 20,
        sortBy: 'uoc_common:title',
        width: 300,
      },
      authorizedBy: {
        formatValue: formatRefName,
        messages: defineMessages({
          label: {
            id: 'column.uoc.default.authorizedBy',
            defaultMessage: 'Authorized by',
          },
        }),
        order: 30,
        sortBy: 'uoc_common:authorizationGroupList/0/authorizedBy',
        width: 300,
      },
      updatedAt: {
        formatValue: formatTimestamp,
        messages: defineMessages({
          label: {
            id: 'column.exhibition.default.updatedAt',
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
