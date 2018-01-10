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
      path: 'ns2:locations_common/locTermGroupList/locTermGroup/termDisplayName',
    },
    {
      op: OP_CONTAIN,
      path: 'ns2:locations_common/locTermGroupList/locTermGroup/termName',
    },
    {
      op: OP_EQ,
      path: 'ns2:locations_common/locTermGroupList/locTermGroup/termStatus',
    },
    {
      op: OP_EQ,
      path: 'ns2:locations_common/locTermGroupList/locTermGroup/termFlag',
    },
    {
      op: OP_EQ,
      path: 'ns2:locations_common/locTermGroupList/locTermGroup/termLanguage',
    },
    {
      op: OP_EQ,
      path: 'ns2:locations_common/locationType',
    },
    {
      op: OP_CONTAIN,
      path: 'ns2:locations_common/securityNote',
    },
    {
      op: OP_CONTAIN,
      path: 'ns2:locations_common/address',
    },
    {
      op: OP_CONTAIN,
      path: 'ns2:locations_common/accessNote',
    },
    {
      op: OP_CONTAIN,
      path: 'ns2:locations_common/conditionGroupList/conditionGroup/conditionNote',
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
