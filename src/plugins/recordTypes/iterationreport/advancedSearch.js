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
        path: 'ns2:iterationreports_common/iterationIdentificationNumber',
      },
      {
        op: OP_EQ,
        path: 'ns2:iterationreports_common/iterationCreatorGroupList/iterationCreatorGroup/iterationCreator',
      },
      ...extensions.core.advancedSearch,
    ],
  };
};
