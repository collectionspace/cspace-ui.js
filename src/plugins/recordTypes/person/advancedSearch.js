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
        path: 'ns2:persons_common/personTermGroupList/personTermGroup/termDisplayName',
      },
      {
        op: OP_EQ,
        path: 'ns2:persons_common/personTermGroupList/personTermGroup/termStatus',
      },
      {
        op: OP_EQ,
        path: 'ns2:persons_common/personTermGroupList/personTermGroup/termFlag',
      },
      {
        op: OP_EQ,
        path: 'ns2:persons_common/gender',
      },
      {
        op: OP_CONTAIN,
        path: 'ns2:persons_common/occupations/occupation',
      },
      {
        op: OP_CONTAIN,
        path: 'ns2:persons_common/schoolsOrStyles/schoolOrStyle',
      },
      {
        op: OP_CONTAIN,
        path: 'ns2:persons_common/groups/group',
      },
      {
        op: OP_CONTAIN,
        path: 'ns2:persons_common/nationalities/nationality',
      },
      // {
      //   op: OP_RANGE,
      //   path: 'ns2:persons_common/birthDateGroup',
      // },
      // {
      //   op: OP_RANGE,
      //   path: 'ns2:persons_common/deathDateGroup',
      // },
      ...extensions.core.advancedSearch,
    ],
  };
};
