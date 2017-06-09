import {
  OP_OR,
  OP_EQ,
  OP_MATCH,
  OP_RANGE,
} from '../../../constants/searchOperators';

export default {
  op: OP_OR,
  value: [
    {
      op: OP_MATCH,
      path: 'ns2:loansout_common/loanOutNumber',
    },
    {
      op: OP_EQ,
      path: 'ns2:loansout_common/loanPurpose',
    },
    {
      op: OP_EQ,
      path: 'ns2:loansout_common/lendersAuthorizer',
    },
    {
      op: OP_EQ,
      path: 'ns2:loansout_common/lendersContact',
    },
    {
      op: OP_EQ,
      path: 'ns2:loansout_common/lendersAuthorizer',
    },
    {
      op: OP_EQ,
      path: 'ns2:loansout_common/borrower',
    },
    {
      op: OP_EQ,
      path: 'ns2:loansout_common/borrowersContact',
    },
    {
      op: OP_EQ,
      path: 'ns2:loansout_common/borrowersAuthorizer',
    },
    {
      op: OP_EQ,
      path: 'ns2:loansout_common/loanStatusGroupList/loanStatusGroup/loanStatus',
    },
    {
      op: OP_RANGE,
      path: 'ns2:loansout_common/loanOutDate',
    },
    {
      op: OP_RANGE,
      path: 'ns2:loansout_common/loanReturnDate',
    },
    {
      op: OP_RANGE,
      path: 'ns2:loansout_common/loanRenewalApplicationDate',
    },
    {
      op: OP_RANGE,
      path: 'ns2:collectionspace_core/updatedAt',
    },
    {
      op: OP_MATCH,
      path: 'ns2:collectionspace_core/updatedBy',
    },
  ],
};
