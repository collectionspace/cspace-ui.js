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
      path: 'ns2:exhibitions_common/exhibitionNumber',
    },
    {
      op: OP_EQ,
      path: 'ns2:exhibitions_common/type',
    },
    {
      op: OP_MATCH,
      path: 'ns2:exhibitions_common/title',
    },
    {
      op: OP_EQ,
      path: 'ns2:exhibitions_common/sponsors/sponsor',
    },
    {
      op: OP_EQ,
      path: 'ns2:exhibitions_common/organizers/organizer',
    },
    {
      op: OP_EQ,
      path: 'ns2:exhibitions_common/venueGroupList/venueGroup/venue',
    },
    {
      op: OP_RANGE,
      path: 'ns2:exhibitions_common/venueGroupList/venueGroup/venueOpeningDate',
    },
    {
      op: OP_RANGE,
      path: 'ns2:exhibitions_common/venueGroupList/venueGroup/venueClosingDate',
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
