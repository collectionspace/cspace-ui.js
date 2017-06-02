import { defineMessages } from 'react-intl';
import { getDisplayName } from 'cspace-refname';
import { formatTimestamp } from '../../../helpers/formatHelpers';

export default {
  default: [
    {
      name: 'loanOutNumber',
      messages: defineMessages({
        label: {
          id: 'column.loanout.default.loanOutNumber',
          defaultMessage: 'Loan Out Number',
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
      formatValue: value => getDisplayName(value),
      sortBy: 'loansout_common:borrower',
      width: 400,
    },
    {
      name: 'updatedAt',
      messages: defineMessages({
        label: {
          id: 'column.group.default.updatedAt',
          defaultMessage: 'Updated',
        },
      }),
      formatValue: formatTimestamp,
      sortBy: 'collectionspace_core:updatedAt',
      width: 150,
    },
  ],
};
