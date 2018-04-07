import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.loanin.name',
      description: 'The name of the record type.',
      defaultMessage: 'Loan In',
    },
    collectionName: {
      id: 'record.loanin.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Loans In',
    },
  }),
  panel: defineMessages({
    info: {
      id: 'panel.loanin.info',
      defaultMessage: 'Loan In Information',
    },
  }),
  inputTable: defineMessages({
    borrower: {
      id: 'inputTable.loanin.borrower',
      defaultMessage: 'Borrower',
    },
  }),
};
