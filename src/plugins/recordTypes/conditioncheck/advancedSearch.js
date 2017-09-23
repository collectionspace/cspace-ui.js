import {
  OP_OR,
  OP_EQ,
  OP_MATCH,
  OP_RANGE,
} from '../../../constants/searchOperators';

export default {
  op: OP_OR,
  value: [
    {
      op: OP_MATCH,
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
    {
      op: OP_MATCH,
      path: 'ns2:collectionspace_core/updatedBy',
    },
    {
      op: OP_RANGE,
      path: 'ns2:collectionspace_core/updatedAt',
    },
  ],
};
