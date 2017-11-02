import { defineMessages } from 'react-intl';
import { formatRefName, formatTimestamp } from '../../../helpers/formatHelpers';

export default {
  default: [
    {
      name: 'loanOutNumber',
      messages: defineMessages({
        label: {
          id: 'column.loanout.default.loanOutNumber',
          defaultMessage: 'Loan out number',
        },
      }),
      sortBy: 'loansout_common:loanOutNumber',
      width: 250,
    },
    {
      name: 'borrower',
      messages: defineMessages({
        label: {
          id: 'column.loanout.default.borrower',
          defaultMessage: 'Borrower',
        },
      }),
      formatValue: formatRefName,
      sortBy: 'loansout_common:borrower',
      width: 400,
    },
    {
      name: 'updatedAt',
      messages: defineMessages({
        label: {
          id: 'column.loanout.default.updatedAt',
          defaultMessage: 'Updated',
        },
      }),
      formatValue: formatTimestamp,
      sortBy: 'collectionspace_core:updatedAt',
      width: 150,
    },
  ],
};
