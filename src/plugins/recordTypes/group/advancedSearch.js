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
      path: 'ns2:groups_common/title',
    },
    {
      op: OP_EQ,
      path: 'ns2:groups_common/responsibleDepartment',
    },
    {
      op: OP_EQ,
      path: 'ns2:groups_common/owner',
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
