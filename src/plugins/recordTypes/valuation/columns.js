import { defineMessages } from 'react-intl';
import { formatTimestamp } from '../../../helpers/formatHelpers';

export default {
  default: [
    {
      name: 'valuationcontrolRefNumber',
      messages: defineMessages({
        label: {
          id: 'column.valuation.default.valuationcontrolRefNumber',
          defaultMessage: 'Valuation control reference number',
        },
      }),
      sortBy: 'valuationcontrols_common:valuationcontrolRefNumber',
      width: 250,
    },
    {
      name: 'valueType',
      messages: defineMessages({
        label: {
          id: 'column.valuation.default.valueType',
          defaultMessage: 'Type',
        },
      }),
      sortBy: 'valuationcontrols_common:valueType',
      width: 400,
    },
    {
      name: 'updatedAt',
      messages: defineMessages({
        label: {
          id: 'column.valuation.default.updatedAt',
          defaultMessage: 'Updated',
        },
      }),
      formatValue: formatTimestamp,
      sortBy: 'collectionspace_core:updatedAt',
      width: 150,
    },
  ],
};
