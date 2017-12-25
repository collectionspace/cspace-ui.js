import { defineMessages } from 'react-intl';

export default (pluginContext) => {
  const {
    formatRefName,
    formatTimestamp,
  } = pluginContext.formatHelpers;

  return {
    default: [
      {
        name: 'loanInNumber',
        messages: defineMessages({
          label: {
            id: 'column.loanin.default.loanInNumber',
            defaultMessage: 'Loan in number',
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
        formatValue: formatRefName,
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
};
