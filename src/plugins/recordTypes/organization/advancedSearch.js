export default (configContext) => {
  const {
    OP_EQ,
    OP_CONTAIN,
    OP_RANGE,
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
        path: 'ns2:organizations_common/orgTermGroupList/orgTermGroup/termDisplayName',
      },
      {
        op: OP_CONTAIN,
        path: 'ns2:organizations_common/orgTermGroupList/orgTermGroup/termName',
      },
      {
        op: OP_EQ,
        path: 'ns2:organizations_common/orgTermGroupList/orgTermGroup/termStatus',
      },
      {
        op: OP_EQ,
        path: 'ns2:organizations_common/orgTermGroupList/orgTermGroup/termFlag',
      },
      {
        op: OP_EQ,
        path: 'ns2:organizations_common/orgTermGroupList/orgTermGroup/termLanguage',
      },
      {
        op: OP_EQ,
        path: 'ns2:organizations_common/organizationRecordTypes/organizationRecordType',
      },
      {
        op: OP_RANGE,
        path: 'ns2:organizations_common/foundingDateGroup',
      },
      {
        op: OP_CONTAIN,
        path: 'ns2:organizations_common/foundingPlace',
      },
      {
        op: OP_RANGE,
        path: 'ns2:organizations_common/dissolutionDateGroup',
      },
      {
        op: OP_CONTAIN,
        path: 'ns2:organizations_common/groups/group',
      },
      {
        op: OP_CONTAIN,
        path: 'ns2:organizations_common/functions/function',
      },
      ...extensions.core.advancedSearch,
    ],
  };
};
