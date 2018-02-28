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
        path: 'ns2:places_common/placeTermGroupList/placeTermGroup/termDisplayName',
      },
      {
        op: OP_CONTAIN,
        path: 'ns2:places_common/placeTermGroupList/placeTermGroup/termName',
      },
      {
        op: OP_EQ,
        path: 'ns2:places_common/placeTermGroupList/placeTermGroup/termStatus',
      },
      {
        op: OP_EQ,
        path: 'ns2:places_common/placeTermGroupList/placeTermGroup/termFlag',
      },
      {
        op: OP_EQ,
        path: 'ns2:places_common/placeTermGroupList/placeTermGroup/termLanguage',
      },
      {
        op: OP_EQ,
        path: 'ns2:places_common/placeType',
      },
      {
        op: OP_EQ,
        path: 'ns2:places_common/placeOwnerGroupList/placeOwnerGroup/owner',
      },
      {
        op: OP_CONTAIN,
        path: 'ns2:places_common/placeNote',
      },
      ...extensions.core.advancedSearch,
    ],
  };
};
