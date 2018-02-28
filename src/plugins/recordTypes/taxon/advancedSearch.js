export default (pluginContext) => {
  const {
    OP_EQ,
    OP_CONTAIN,
  } = pluginContext.searchOperators;

  const {
    defaultAdvancedSearchBooleanOp,
    extensions,
  } = pluginContext.config;

  return {
    op: defaultAdvancedSearchBooleanOp,
    value: [
      {
        op: OP_CONTAIN,
        path: 'ns2:taxon_common/taxonTermGroupList/taxonTermGroup/termDisplayName',
      },
      {
        op: OP_EQ,
        path: 'ns2:taxon_common/taxonTermGroupList/taxonTermGroup/termStatus',
      },
      {
        op: OP_EQ,
        path: 'ns2:taxon_common/taxonTermGroupList/taxonTermGroup/termFlag',
      },
      {
        op: OP_EQ,
        path: 'ns2:taxon_common/taxonTermGroupList/taxonTermGroup/taxonomicStatus',
      },
      {
        op: OP_EQ,
        path: 'ns2:taxon_common/taxonRank',
      },
      {
        op: OP_EQ,
        path: 'ns2:taxon_common/taxonAuthorGroupList/taxonAuthorGroup/taxonAuthor',
      },
      {
        op: OP_CONTAIN,
        path: 'ns2:taxon_common/taxonYear',
      },
      {
        op: OP_EQ,
        path: 'ns2:taxon_common/taxonCitationList/taxonCitation',
      },
      {
        op: OP_CONTAIN,
        path: 'ns2:taxon_common/taxonNote',
      },
      {
        op: OP_CONTAIN,
        path: 'ns2:taxon_common/commonNameGroupList/commonNameGroup/commonName',
      },
      ...extensions.core.advancedSearch,
    ],
  };
};
