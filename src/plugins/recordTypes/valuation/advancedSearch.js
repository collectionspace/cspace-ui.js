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
      path: 'ns2:valuationcontrols_common/valuationcontrolRefNumber',
    },
    {
      op: OP_RANGE,
      path: 'ns2:valuationcontrols_common/valueDate',
    },
    {
      op: OP_RANGE,
      path: 'ns2:valuationcontrols_common/valueRenewalDate',
    },
    {
      op: OP_EQ,
      path: 'ns2:valuationcontrols_common/valueType',
    },
    {
      op: OP_EQ,
      path: 'ns2:valuationcontrols_common/valueSource',
    },
    {
      op: OP_RANGE,
      path: 'ns2:collectionspace_core/updatedAt',
    },
    {
      op: OP_MATCH,
      path: 'ns2:collectionspace_core/updatedBy',
    },
  ],
};
