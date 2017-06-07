import { defineMessages } from 'react-intl';
import { getDisplayName } from 'cspace-refname';
import { formatTimestamp } from '../../../helpers/formatHelpers';

export default {
  default: [
    {
      name: 'loanInNumber',
      messages: defineMessages({
        label: {
          id: 'column.loanin.default.loanInNumber',
          defaultMessage: 'Loan In Number',
        },
      }),
      sortBy: 'loansin_common:loanInNumber',
      width: 250,
    },
    {
      name: 'borrower',
      messages: defineMessages({
        label: {
          id: 'column.loanin.default.borrower',
          defaultMessage: 'Borrower',
        },
      }),
      formatValue: value => getDisplayName(value),
      sortBy: 'loansin_common:borrower',
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
