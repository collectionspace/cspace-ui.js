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
      path: 'ns2:taxon_common/taxonTermGroupList/taxonTermGroup/termDisplayName',
    },
    {
      op: OP_EQ,
      path: 'ns2:taxon_common/taxonTermGroupList/taxonTermGroup/termStatus',
    },
    {
      op: OP_EQ,
      path: 'ns2:taxon_common/taxonTermGroupList/taxonTermGroup/termFlag',
    },
    {
      op: OP_EQ,
      path: 'ns2:taxon_common/taxonTermGroupList/taxonTermGroup/taxonomicStatus',
    },
    {
      op: OP_EQ,
      path: 'ns2:taxon_common/taxonRank',
    },
    {
      op: OP_EQ,
      path: 'ns2:taxon_common/taxonAuthorGroupList/taxonAuthorGroup/taxonAuthor',
    },
    {
      op: OP_MATCH,
      path: 'ns2:taxon_common/taxonYear',
    },
    {
      op: OP_EQ,
      path: 'ns2:taxon_common/taxonCitationList/taxonCitation',
    },
    {
      op: OP_MATCH,
      path: 'ns2:taxon_common/taxonNote',
    },
    {
      op: OP_MATCH,
      path: 'ns2:taxon_common/commonNameGroupList/commonNameGroup/commonName',
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
