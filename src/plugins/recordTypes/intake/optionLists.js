import { defineMessages } from 'react-intl';

export default {
  entryReasons: {
    values: [
      'enquiry',
      'consideration',
      'commission',
      'loan',
    ],
    messages: defineMessages({
      enquiry: {
        id: 'option.entryReasons.enquiry',
        defaultMessage: 'enquiry',
      },
      consideration: {
        id: 'option.entryReasons.consideration',
        defaultMessage: 'consideration',
      },
      commission: {
        id: 'option.entryReasons.commission',
        defaultMessage: 'commission',
      },
      loan: {
        id: 'option.entryReasons.loan',
        defaultMessage: 'loan',
      },
    }),
  },
};
