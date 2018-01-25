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
        path: 'ns2:citations_common/citationTermGroupList/citationTermGroup/termDisplayName',
      },
      {
        op: OP_EQ,
        path: 'ns2:citations_common/citationTermGroupList/citationTermGroup/termStatus',
      },
      {
        op: OP_EQ,
        path: 'ns2:citations_common/citationTermGroupList/citationTermGroup/termType',
      },
      {
        op: OP_EQ,
        path: 'ns2:citations_common/citationTermGroupList/citationTermGroup/termFlag',
      },
      {
        op: OP_EQ,
        path: 'ns2:citations_common/citationTermGroupList/citationTermGroup/termLanguage',
      },
      {
        op: OP_CONTAIN,
        path: 'ns2:citations_common/citationTermGroupList/citationTermGroup/termFullCitation',
      },
      {
        op: OP_CONTAIN,
        path: 'ns2:citations_common/citationTermGroupList/citationTermGroup/termTitle',
      },
      ...extensions.core.advancedSearch,
    ],
  };
};
