import { defineMessages } from 'react-intl';

export default (pluginContext) => {
  const {
    formatOption,
    formatRefName,
    formatTimestamp,
  } = pluginContext.formatHelpers;

  return {
    default: [
      {
        name: 'taxonName',
        messages: defineMessages({
          label: {
            id: 'column.pottag.default.taxonName',
            defaultMessage: 'Taxon name',
          },
        }),
        formatValue: value => formatRefName(value),
        sortBy: 'pottags_common:taxonName',
        width: 200,
      },
      {
        name: 'family',
        messages: defineMessages({
          label: {
            id: 'column.pottag.default.family',
            defaultMessage: 'Family',
          },
        }),
        formatValue: value => formatRefName(value),
        sortBy: 'pottags_common:family',
        width: 200,
      },
      {
        name: 'printLabels',
        messages: defineMessages({
          label: {
            id: 'column.pottag.default.printLabels',
            defaultMessage: 'Print labels',
          },
        }),
        sortBy: 'pottags_common:printLabels',
        formatValue: (data, formatterContext) =>
          formatOption('printLabelOptions', data, formatterContext),
        width: 150,
      },
      {
        name: 'updatedAt',
        messages: defineMessages({
          label: {
            id: 'column.pottag.default.updatedAt',
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
