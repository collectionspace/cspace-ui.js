import { defineMessages } from 'react-intl';
import { getDisplayName } from 'cspace-refname';
import { formatTimestamp } from '../../../helpers/formatHelpers';

export default {
  default: [
    {
      name: 'taxonName',
      messages: defineMessages({
        label: {
          id: 'column.pottag.default.taxonName',
          defaultMessage: 'Taxon name',
        },
      }),
      formatValue: value => getDisplayName(value),
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
      formatValue: value => getDisplayName(value),
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
