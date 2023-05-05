export default (configContext) => {
  const {
    OP_EQ,
    OP_CONTAIN,
  } = configContext.searchOperators;

  const {
    defaultAdvancedSearchBooleanOp,
    extensions,
  } = configContext.config;

  return {
    op: defaultAdvancedSearchBooleanOp,
    value: [
      {
        op: OP_CONTAIN,
        path: 'ns2:chronologies_common/chronologyTermGroupList/chronologyTermGroup/termDisplayName',
      },
      {
        op: OP_EQ,
        path: 'ns2:chronologies_common/chronologyTermGroupList/chronologyTermGroup/termStatus',
      },
      {
        op: OP_EQ,
        path: 'ns2:chronologies_common/chronologyTermGroupList/chronologyTermGroup/termType',
      },
      {
        op: OP_EQ,
        path: 'ns2:chronologies_common/chronologyTermGroupList/chronologyTermGroup/termFlag',
      },
      {
        op: OP_EQ,
        path: 'ns2:chronologies_common/chronologyTermGroupList/chronologyTermGroup/termLanguage',
      },
      ...extensions.core.advancedSearch,
    ],
  };
};
