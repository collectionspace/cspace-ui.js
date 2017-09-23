import {
  OP_EQ,
  OP_OR,
  OP_MATCH,
  OP_RANGE,
} from '../../../constants/searchOperators';

export default {
  op: OP_OR,
  value: [
    {
      op: OP_MATCH,
      path: 'ns2:media_common/identificationNumber',
    },
    {
      op: OP_MATCH,
      path: 'ns2:media_common/title',
    },
    {
      op: OP_EQ,
      path: 'ns2:media_common/creator',
    },
    {
      op: OP_EQ,
      path: 'ns2:media_common/languageList/language',
    },
    {
      op: OP_EQ,
      path: 'ns2:media_common/publisher',
    },
    {
      op: OP_EQ,
      path: 'ns2:media_common/typeList/type',
    },
    // {
    //   op: OP_RANGE,
    //   path: 'ns2:media_common/dateGroupList/dateGroup',
    // },
    {
      op: OP_MATCH,
      path: 'ns2:media_common/source',
    },
    {
      op: OP_MATCH,
      path: 'ns2:media_common/subjectList/subject',
    },
    {
      op: OP_EQ,
      path: 'ns2:media_common/rightsHolder',
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
