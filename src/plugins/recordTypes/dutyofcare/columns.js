import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    formatTimestamp,
  } = configContext.formatHelpers;

  return {
    default: {
      dutyOfCareNumber: {
        messages: defineMessages({
          label: {
            id: 'column.dutyofcare.default.dutyOfCareNumber',
            defaultMessage: 'Duty of care number',
          },
        }),
        order: 10,
        sortBy: 'dutiesofcare_common:dutyOfCareNumber',
        width: 200,
      },
      dutyOfCareTitle: {
        messages: defineMessages({
          label: {
            id: 'column.dutyofcare.default.dutyOfCareTitle',
            defaultMessage: 'Title',
          },
        }),
        order: 20,
        sortBy: 'dutiesofcare_common:dutyOfCareTitle',
        width: 200,
      },
      updatedAt: {
        formatValue: formatTimestamp,
        messages: defineMessages({
          label: {
            id: 'column.dutyofcare.default.updatedAt',
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
