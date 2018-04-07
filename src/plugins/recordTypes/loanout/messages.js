import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.loanout.name',
      description: 'The name of the record type.',
      defaultMessage: 'Loan Out',
    },
    collectionName: {
      id: 'record.loanout.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Loans Out',
    },
  }),
  panel: defineMessages({
    info: {
      id: 'panel.loanout.info',
      defaultMessage: 'Loan Out Information',
    },
  }),
  inputTable: defineMessages({
    borrower: {
      id: 'inputTable.loanout.borrower',
      defaultMessage: 'Borrower',
    },
    lender: {
      id: 'inputTable.loanout.lender',
      defaultMessage: 'Lender',
    },
  }),
};
