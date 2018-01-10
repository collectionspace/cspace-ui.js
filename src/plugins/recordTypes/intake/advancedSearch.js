import {
  OP_OR,
  OP_EQ,
  OP_CONTAIN,
  OP_RANGE,
} from '../../../constants/searchOperators';

export default {
  op: OP_OR,
  value: [
    {
      op: OP_CONTAIN,
      path: 'ns2:intakes_common/entryNumber',
    },
    {
      op: OP_RANGE,
      path: 'ns2:intakes_common/entryDate',
    },
    {
      op: OP_CONTAIN,
      path: 'ns2:intakes_common/entryReason',
    },
    {
      op: OP_EQ,
      path: 'ns2:intakes_common/entryMethods/entryMethod',
    },
    {
      op: OP_RANGE,
      path: 'ns2:intakes_common/returnDate',
    },
    {
      op: OP_EQ,
      path: 'ns2:intakes_common/currentOwner',
    },
    {
      op: OP_EQ,
      path: 'ns2:intakes_common/depositor',
    },
    {
      op: OP_CONTAIN,
      path: 'ns2:intakes_common/fieldCollectionEventNames/fieldCollectionEventName',
    },
    {
      op: OP_EQ,
      path: 'ns2:intakes_common/currentLocationGroupList/currentLocationGroup/currentLocation',
    },
    {
      op: OP_CONTAIN,
      path: 'ns2:collectionspace_core/updatedBy',
    },
    {
      op: OP_RANGE,
      path: 'ns2:collectionspace_core/updatedAt',
    },
  ],
};
