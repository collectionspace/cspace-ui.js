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
            id: 'column.nagpraclaim.default.claimNumber',
            defaultMessage: 'Claim number',
          },
        }),
        order: 10,
        sortBy: 'nagpraclaims_common:claimNumber',
        width: 200,
      },
      title: {
        messages: defineMessages({
          label: {
            id: 'column.nagpraclaim.default.title',
            defaultMessage: 'Claim title',
          },
        }),
        order: 20,
        sortBy: 'nagpraclaims_common:title',
        width: 200,
      },
      updatedAt: {
        formatValue: formatTimestamp,
        messages: defineMessages({
          label: {
            id: 'column.nagpraclaim.default.updatedAt',
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
