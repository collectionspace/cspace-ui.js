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
      name: 'lender',
      messages: defineMessages({
        label: {
          id: 'column.loanin.default.lender',
          defaultMessage: 'Lender',
        },
      }),
      formatValue: value => getDisplayName(value),
      sortBy: 'loansin_common:lender',
      width: 400,
    },
    {
      name: 'updatedAt',
      messages: defineMessages({
        label: {
          id: 'column.loanin.default.updatedAt',
          defaultMessage: 'Updated',
        },
      }),
      formatValue: formatTimestamp,
      sortBy: 'collectionspace_core:updatedAt',
      width: 150,
    },
  ],
};
