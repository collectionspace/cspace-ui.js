import { defineMessages } from 'react-intl';

export default (pluginContext) => {
  const {
    formatOption,
    formatTimestamp,
  } = pluginContext.formatHelpers;

  return {
    default: {
      valuationcontrolRefNumber: {
        messages: defineMessages({
          label: {
            id: 'column.valuation.default.valuationcontrolRefNumber',
            defaultMessage: 'Reference number',
          },
        }),
        order: 10,
        sortBy: 'valuationcontrols_common:valuationcontrolRefNumber',
        width: 250,
      },
      valueType: {
        formatValue: (data, formatterContext) =>
          formatOption('valueTypes', data, formatterContext),
        messages: defineMessages({
          label: {
            id: 'column.valuation.default.valueType',
            defaultMessage: 'Type',
          },
        }),
        order: 20,
        sortBy: 'valuationcontrols_common:valueType',
        width: 400,
      },
      updatedAt: {
        formatValue: formatTimestamp,
        messages: defineMessages({
          label: {
            id: 'column.valuation.default.updatedAt',
            defaultMessage: 'Updated',
          },
        }),
        order: 30,
        sortBy: 'collectionspace_core:updatedAt',
        width: 150,
      },
    },
  };
};
