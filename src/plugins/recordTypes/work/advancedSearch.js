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
      path: 'ns2:works_common/workTermGroupList/workTermGroup/termDisplayName',
    },
    {
      op: OP_CONTAIN,
      path: 'ns2:works_common/workTermGroupList/workTermGroup/termName',
    },
    {
      op: OP_EQ,
      path: 'ns2:works_common/workTermGroupList/workTermGroup/termStatus',
    },
    {
      op: OP_EQ,
      path: 'ns2:works_common/workTermGroupList/workTermGroup/termFlag',
    },
    {
      op: OP_EQ,
      path: 'ns2:works_common/workTermGroupList/workTermGroup/termLanguage',
    },
    {
      op: OP_EQ,
      path: 'ns2:works_common/workType',
    },
    // {
    //   op: OP_RANGE,
    //   path: 'ns2:works_common/workDateGroupList/workDateGroup',
    // },
    {
      op: OP_EQ,
      path: 'ns2:works_common/creatorGroupList/creatorGroup/creator',
    },
    {
      op: OP_EQ,
      path: 'ns2:works_common/publisherGroupList/publisherGroup/publisher',
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
