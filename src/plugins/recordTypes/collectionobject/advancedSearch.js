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
      path: 'ns2:collectionobjects_common/objectNumber',
    },
    {
      op: OP_EQ,
      path: 'ns2:collectionobjects_common/recordStatus',
    },
    {
      op: OP_MATCH,
      path: 'ns2:collectionobjects_common/titleGroupList/titleGroup/title',
    },
    {
      op: OP_RANGE,
      path: 'ns2:collectionspace_core/updatedAt',
    },
  ],
};
