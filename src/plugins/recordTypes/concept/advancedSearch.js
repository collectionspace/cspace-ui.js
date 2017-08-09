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
      path: 'ns2:concepts_common/conceptTermGroupList/conceptTermGroup/termDisplayName',
    },
    {
      op: OP_MATCH,
      path: 'ns2:concepts_common/conceptTermGroupList/conceptTermGroup/termName',
    },
    {
      op: OP_EQ,
      path: 'ns2:concepts_common/conceptTermGroupList/conceptTermGroup/termStatus',
    },
    {
      op: OP_EQ,
      path: 'ns2:concepts_common/conceptTermGroupList/conceptTermGroup/termFlag',
    },
    {
      op: OP_EQ,
      path: 'ns2:concepts_common/conceptTermGroupList/conceptTermGroup/termLanguage',
    },
    {
      op: OP_EQ,
      path: 'ns2:concepts_common/conceptRecordTypes/conceptRecordType',
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
