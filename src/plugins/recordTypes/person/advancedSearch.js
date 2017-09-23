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
      path: 'ns2:persons_common/personTermGroupList/personTermGroup/termDisplayName',
    },
    {
      op: OP_EQ,
      path: 'ns2:persons_common/personTermGroupList/personTermGroup/termStatus',
    },
    {
      op: OP_EQ,
      path: 'ns2:persons_common/personTermGroupList/personTermGroup/termFlag',
    },
    {
      op: OP_EQ,
      path: 'ns2:persons_common/gender',
    },
    {
      op: OP_MATCH,
      path: 'ns2:persons_common/occupations/occupation',
    },
    {
      op: OP_MATCH,
      path: 'ns2:persons_common/schoolsOrStyles/schoolOrStyle',
    },
    {
      op: OP_MATCH,
      path: 'ns2:persons_common/groups/group',
    },
    {
      op: OP_MATCH,
      path: 'ns2:persons_common/nationalities/nationality',
    },
    // {
    //   op: OP_RANGE,
    //   path: 'ns2:persons_common/birthDateGroup',
    // },
    // {
    //   op: OP_RANGE,
    //   path: 'ns2:persons_common/deathDateGroup',
    // },
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
