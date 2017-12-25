import { defineMessages } from 'react-intl';

export default (pluginContext) => {
  const {
    formatOption,
    formatTimestamp,
  } = pluginContext.formatHelpers;

  return {
    default: [
      {
        name: 'valuationcontrolRefNumber',
        messages: defineMessages({
          label: {
            id: 'column.valuation.default.valuationcontrolRefNumber',
            defaultMessage: 'Reference number',
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
        formatValue: (data, formatterContext) =>
          formatOption('valueTypes', data, formatterContext),
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
};
