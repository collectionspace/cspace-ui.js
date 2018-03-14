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
        path: 'ns2:concepts_common/conceptTermGroupList/conceptTermGroup/termDisplayName',
      },
      {
        op: OP_CONTAIN,
        path: 'ns2:concepts_common/conceptTermGroupList/conceptTermGroup/termName',
      },
      {
        op: OP_EQ,
        path: 'ns2:concepts_common/conceptTermGroupList/conceptTermGroup/termStatus',
      },
      {
        op: OP_EQ,
        path: 'ns2:concepts_common/conceptTermGroupList/conceptTermGroup/termFlag',
      },
      {
        op: OP_EQ,
        path: 'ns2:concepts_common/conceptTermGroupList/conceptTermGroup/termLanguage',
      },
      {
        op: OP_EQ,
        path: 'ns2:concepts_common/conceptRecordTypes/conceptRecordType',
      },
      ...extensions.core.advancedSearch,
    ],
  };
};
