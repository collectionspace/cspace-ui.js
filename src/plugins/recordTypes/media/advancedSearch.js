import {
  OP_OR,
  OP_MATCH,
} from '../../../constants/searchOperators';

export default {
  op: OP_OR,
  value: [
    {
      op: OP_MATCH,
      path: 'ns2:media_common/identificationNumber',
    },
  ],
};
