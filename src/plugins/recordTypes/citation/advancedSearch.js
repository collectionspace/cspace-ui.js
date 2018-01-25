export default (pluginContext) => {
  const {
    OP_OR,
    OP_EQ,
    OP_CONTAIN,
    OP_RANGE,
  } = pluginContext.searchOperators;

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
      {
        op: OP_CONTAIN,
        path: 'ns2:collectionspace_core/updatedBy',
      },
      {
        op: OP_RANGE,
        path: 'ns2:collectionspace_core/updatedAt',
      },
    ],
  };
};
