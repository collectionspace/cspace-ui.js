import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    formatTimestamp,
  } = configContext.formatHelpers;

  return {
    default: {
      consultationNumber: {
        messages: defineMessages({
          label: {
            id: 'column.consultation.default.Number',
            defaultMessage: 'Consultation number',
          },
        }),
        order: 10,
        sortBy: 'consultations_common:consultationNumber',
        width: 200,
      },
      updatedAt: {
        formatValue: formatTimestamp,
        messages: defineMessages({
          label: {
            id: 'column.consultation.default.updatedAt',
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
