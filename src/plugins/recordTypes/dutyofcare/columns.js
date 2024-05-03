import { defineMessages } from 'react-intl';

export default () => ({
  default: {
    dutyOfCareNumber: {
      messages: defineMessages({
        label: {
          id: 'column.dutyofcares_common.default.dutyOfCareNumber',
          defaultMessage: 'Duty of care ID',
        },
      }),
      order: 10,
      sortBy: 'dutyofcares_common:referenceNumber',
      width: 200,
    },
  },
});
