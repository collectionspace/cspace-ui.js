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
        path: 'ns2:audit_common/idNumber'
      },
      {
        op: OP_EQ,
        path: 'ns2:audit_common/recordType'
      },
      {
        op: OP_CONTAIN,
        path: 'ns2:audit_common/recordId'
      },
      ...extensions.core.advancedSearch,
    ],
  };
};
