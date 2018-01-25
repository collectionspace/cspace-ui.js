export default (pluginContext) => {
  const {
    OP_OR,
    OP_EQ,
    OP_CONTAIN,
  } = pluginContext.searchOperators;

  const {
    extensions,
  } = pluginContext.config;

  return {
    op: OP_OR,
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
