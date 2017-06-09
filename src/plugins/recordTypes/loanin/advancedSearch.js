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
      path: 'ns2:loansin_common/loanInNumber',
    },
    {
      op: OP_EQ,
      path: 'ns2:loansin_common/loanPurpose',
    },
    {
      op: OP_EQ,
      path: 'ns2:loansin_common/lenderGroupList/lenderGroup/lender',
    },
    {
      op: OP_EQ,
      path: 'ns2:loansin_common/lenderGroupList/lenderGroup/lendersContact',
    },
    {
      op: OP_EQ,
      path: 'ns2:loansin_common/lenderGroupList/lenderGroup/lendersAuthorizer',
    },
    {
      op: OP_EQ,
      path: 'ns2:loansin_common/borrowersContact',
    },
    {
      op: OP_EQ,
      path: 'ns2:loansin_common/borrowersAuthorizer',
    },
    {
      op: OP_EQ,
      path: 'ns2:loansin_common/loanStatusGroupList/loanStatusGroup/loanStatus',
    },
    {
      op: OP_RANGE,
      path: 'ns2:loansin_common/loanInDate',
    },
    {
      op: OP_RANGE,
      path: 'ns2:loansin_common/loanReturnDate',
    },
    {
      op: OP_RANGE,
      path: 'ns2:loansin_common/loanRenewalApplicationDate',
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
