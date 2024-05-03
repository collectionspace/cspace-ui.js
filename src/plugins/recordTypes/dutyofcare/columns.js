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
            defaultMessage: 'Duty of care ID',
          },
        }),
        order: 10,
        sortBy: 'dutyofcares_common:dutyOfCareNumber',
        width: 200,
      },
      dutyOfCareTitle: {
        messages: defineMessages({
          label: {
            id: 'column.dutyofcare.default.dutyOfCareTitle',
            defaultMessage: 'Duty of care title',
          },
        }),
        order: 20,
        sortBy: 'dutyofcares_common:dutyOfCareTitle',
        width: 200,
      },
      updatedAt: {
        formatValue: formatTimestamp,
        messages: defineMessages({
          label: {
            id: 'column.dutyofcare.default.updatedAt',
            defaultMessage: 'Updated at',
          },
        }),
        order: 30,
        sortBy: 'collectionspace_core:updatedAt',
        width: 150,
      },
    },
    narrow: {
      dutyOfCareNumber: {
        messages: defineMessages({
          label: {
            id: 'column.dutyofcare.narrow.dutyOfCareNumber',
            defaultMessage: 'ID',
          },
        }),
        order: 10,
        sortBy: 'dutyofcares_common:dutyOfCareNumber',
        width: 200,
      },
      dutyOfCareTitle: {
        messages: defineMessages({
          label: {
            id: 'column.dutyofcare.narrow.dutyOfCareTitle',
            defaultMessage: 'Title',
          },
        }),
        order: 20,
        sortBy: 'dutyofcares_common:dutyOfCareTitle',
        width: 200,
      },
      updatedAt: {
        formatValue: formatTimestamp,
        messages: defineMessages({
          label: {
            id: 'column.dutyofcare.narrow.updatedAt',
            defaultMessage: 'Updated at',
          },
        }),
        order: 30,
        sortBy: 'collectionspace_core:updatedAt',
        width: 150,
      },
    },
  };
};
