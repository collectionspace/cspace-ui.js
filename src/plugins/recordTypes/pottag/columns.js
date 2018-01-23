import { defineMessages } from 'react-intl';

export default (pluginContext) => {
  const {
    formatOption,
    formatRefName,
    formatTimestamp,
  } = pluginContext.formatHelpers;

  return {
    default: {
      taxonName: {
        formatValue: formatRefName,
        messages: defineMessages({
          label: {
            id: 'column.pottag.default.taxonName',
            defaultMessage: 'Taxon name',
          },
        }),
        order: 10,
        sortBy: 'pottags_common:taxonName',
        width: 200,
      },
      family: {
        formatValue: formatRefName,
        messages: defineMessages({
          label: {
            id: 'column.pottag.default.family',
            defaultMessage: 'Family',
          },
        }),
        order: 20,
        sortBy: 'pottags_common:family',
        width: 200,
      },
      printLabels: {
        formatValue: (data, formatterContext) =>
          formatOption('printLabelOptions', data, formatterContext),
        messages: defineMessages({
          label: {
            id: 'column.pottag.default.printLabels',
            defaultMessage: 'Print labels',
          },
        }),
        order: 30,
        sortBy: 'pottags_common:printLabels',
        width: 150,
      },
      updatedAt: {
        formatValue: formatTimestamp,
        messages: defineMessages({
          label: {
            id: 'column.pottag.default.updatedAt',
            defaultMessage: 'Updated',
          },
        }),
        order: 40,
        sortBy: 'collectionspace_core:updatedAt',
        width: 150,
      },
    },
  };
};
