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
        path: 'ns2:locations_common/locTermGroupList/locTermGroup/termDisplayName',
      },
      {
        op: OP_CONTAIN,
        path: 'ns2:locations_common/locTermGroupList/locTermGroup/termName',
      },
      {
        op: OP_EQ,
        path: 'ns2:locations_common/locTermGroupList/locTermGroup/termStatus',
      },
      {
        op: OP_EQ,
        path: 'ns2:locations_common/locTermGroupList/locTermGroup/termFlag',
      },
      {
        op: OP_EQ,
        path: 'ns2:locations_common/locTermGroupList/locTermGroup/termLanguage',
      },
      {
        op: OP_EQ,
        path: 'ns2:locations_common/locationType',
      },
      {
        op: OP_CONTAIN,
        path: 'ns2:locations_common/securityNote',
      },
      {
        op: OP_CONTAIN,
        path: 'ns2:locations_common/address',
      },
      {
        op: OP_CONTAIN,
        path: 'ns2:locations_common/accessNote',
      },
      {
        op: OP_CONTAIN,
        path: 'ns2:locations_common/conditionGroupList/conditionGroup/conditionNote',
      },
      ...extensions.core.advancedSearch,
    ],
  };
};
