import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    formatTimestamp,
    formatRefName,
  } = configContext.formatHelpers;

  return {
    default: {
      heldInTrustNumber: {
        messages: defineMessages({
          label: {
            id: 'column.heldintrust.default.heldInTrustNumber',
            defaultMessage: 'Held-in-Trust number',
          },
        }),
        order: 10,
        sortBy: 'heldintrusts_common:heldInTrustNumber',
        width: 200,
      },
      depositor: {
        formatValue: formatRefName,
        messages: defineMessages({
          label: {
            id: 'column.heldintrust.default.depositor',
            defaultMessage: 'Depositor',
          },
        }),
        order: 20,
        sortBy: 'heldintrusts_common:heldInTrustDepositorGroupList/0/depositor',
        width: 450,
      },
      updatedAt: {
        formatValue: formatTimestamp,
        messages: defineMessages({
          label: {
            id: 'column.heldintrust.default.updatedAt',
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
