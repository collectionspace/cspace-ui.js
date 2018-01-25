export default (pluginContext) => {
  const {
    OP_OR,
    OP_EQ,
    OP_CONTAIN,
    OP_RANGE,
  } = pluginContext.searchOperators;

  const {
    extensions,
  } = pluginContext.config;

  return {
    op: OP_OR,
    value: [
      {
        op: OP_CONTAIN,
        path: 'ns2:loansin_common/loanInNumber',
      },
      {
        op: OP_EQ,
        path: 'ns2:loansin_common/loanPurpose',
      },
      {
        op: OP_EQ,
        path: 'ns2:loansin_common/loanStatusGroupList/loanStatusGroup/loanStatus',
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
      ...extensions.core.advancedSearch,
    ],
  };
};
