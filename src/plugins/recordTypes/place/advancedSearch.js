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
      path: 'ns2:places_common/placeTermGroupList/placeTermGroup/termDisplayName',
    },
    {
      op: OP_MATCH,
      path: 'ns2:places_common/placeTermGroupList/placeTermGroup/termName',
    },
    {
      op: OP_EQ,
      path: 'ns2:places_common/placeTermGroupList/placeTermGroup/termStatus',
    },
    {
      op: OP_EQ,
      path: 'ns2:places_common/placeTermGroupList/placeTermGroup/termFlag',
    },
    {
      op: OP_EQ,
      path: 'ns2:places_common/placeTermGroupList/placeTermGroup/termLanguage',
    },
    {
      op: OP_EQ,
      path: 'ns2:places_common/placeType',
    },
    {
      op: OP_MATCH,
      path: 'ns2:places_common/placeNote',
    },
    {
      op: OP_EQ,
      path: 'ns2:places_common/placeOwnerGroupList/placeOwnerGroup/owner',
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
