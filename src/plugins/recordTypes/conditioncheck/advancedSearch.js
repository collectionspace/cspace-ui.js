export default (pluginContext) => {
  const {
    OP_EQ,
    OP_CONTAIN,
    OP_RANGE,
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
        path: 'ns2:conditionchecks_common/conditionCheckRefNumber',
      },
      {
        op: OP_RANGE,
        path: 'ns2:conditionchecks_common/conditionCheckAssessmentDate',
      },
      {
        op: OP_EQ,
        path: 'ns2:conditionchecks_common/objectAuditCategory',
      },
      {
        op: OP_EQ,
        path: 'ns2:conditionchecks_common/conservationTreatmentPriority',
      },
      {
        op: OP_RANGE,
        path: 'ns2:conditionchecks_common/nextConditionCheckDate',
      },
      {
        op: OP_EQ,
        path: 'ns2:conditionchecks_common/conditionCheckGroupList/conditionCheckGroup/condition',
      },
      ...extensions.core.advancedSearch,
    ],
  };
};
