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
          defaultMessage: 'Taxon Name',
        },
      }),
      formatValue: value => getDisplayName(value),
      sortBy: 'pottags_common:taxonName',
      width: 200,
    },
    {
      name: 'printLabels',
      messages: defineMessages({
        label: {
          id: 'column.pottag.default.printLabels',
          defaultMessage: 'Should print labels?',
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
