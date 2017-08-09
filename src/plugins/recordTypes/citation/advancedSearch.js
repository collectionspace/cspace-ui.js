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
      path: 'ns2:citations_common/citationTermGroupList/citationTermGroup/termDisplayName',
    },
    {
      op: OP_MATCH,
      path: 'ns2:citations_common/citationTermGroupList/citationTermGroup/termName',
    },
    {
      op: OP_EQ,
      path: 'ns2:citations_common/citationTermGroupList/citationTermGroup/termStatus',
    },
    {
      op: OP_EQ,
      path: 'ns2:citations_common/citationTermGroupList/citationTermGroup/termFlag',
    },
    {
      op: OP_EQ,
      path: 'ns2:citations_common/citationTermGroupList/citationTermGroup/termLanguage',
    },
    {
      op: OP_MATCH,
      path: 'ns2:citations_common/citationTermGroupList/citationTermGroup/termTitle',
    },
    {
      op: OP_MATCH,
      path: 'ns2:citations_common/citationTermGroupList/citationTermGroup/termFullCitation',
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
