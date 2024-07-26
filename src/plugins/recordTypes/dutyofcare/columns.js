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
      title: {
        messages: defineMessages({
          label: {
            id: 'column.dutyofcare.default.title',
            defaultMessage: 'Title',
          },
        }),
        order: 20,
        sortBy: 'dutiesofcare_common:title',
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
