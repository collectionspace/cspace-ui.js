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
      op: OP_EQ,
      path: 'ns2:pottags_common/family',
    },
    {
      op: OP_MATCH,
      path: 'ns2:pottags_common/commonName',
    },
    {
      op: OP_MATCH,
      path: 'ns2:pottags_common/locale',
    },
    {
      op: OP_EQ,
      path: 'ns2:pottags_common/taxonName',
    },
    {
      op: OP_EQ,
      path: 'ns2:pottags_common/printLabels',
    },
    {
      op: OP_MATCH,
      path: 'ns2:pottags_common/updatedBy',
    },
    {
      op: OP_RANGE,
      path: 'ns2:pottags_common/updatedAt',
    },
  ],
};
