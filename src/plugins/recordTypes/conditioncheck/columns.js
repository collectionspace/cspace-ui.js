import { defineMessages } from 'react-intl';
import { formatTimestamp } from '../../../helpers/formatHelpers';

export default {
  default: [
    {
      name: 'conditionCheckRefNumber',
      messages: defineMessages({
        label: {
          id: 'column.conditioncheck.default.conditionCheckRefNumber',
          defaultMessage: 'Condition check reference number',
        },
      }),
      sortBy: 'conditionchecks_common:conditionCheckRefNumber',
      width: 200,
    },
    {
      name: 'condition',
      messages: defineMessages({
        label: {
          id: 'column.conditioncheck.default.condition',
          defaultMessage: 'Condition',
        },
      }),
      sortBy: 'conditionchecks_common:conditionCheckGroupList/conditionCheckGroup/0/condition',
      width: 450,
    },
    {
      name: 'updatedAt',
      messages: defineMessages({
        label: {
          id: 'column.conditioncheck.default.updatedAt',
          defaultMessage: 'Updated',
        },
      }),
      formatValue: formatTimestamp,
      sortBy: 'collectionspace_core:updatedAt',
      width: 150,
    },
  ],
};
