import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    formatTimestamp,
  } = configContext.formatHelpers;

  return {
    default: {
      claimNumber: {
        messages: defineMessages({
          label: {
            id: 'column.repatriationclaim.default.claimNumber',
            defaultMessage: 'Claim number',
          },
        }),
        order: 10,
        sortBy: 'repatriationclaims_common:claimNumber',
        width: 200,
      },
      title: {
        messages: defineMessages({
          label: {
            id: 'column.repatriationclaim.default.title',
            defaultMessage: 'Claim title',
          },
        }),
        order: 20,
        sortBy: 'repatriationclaims_common:title',
        width: 200,
      },
      updatedAt: {
        formatValue: formatTimestamp,
        messages: defineMessages({
          label: {
            id: 'column.repatriationclaim.default.updatedAt',
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
