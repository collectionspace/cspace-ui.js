import { defineMessages } from 'react-intl';
import { getDisplayName } from 'cspace-refname';
import { formatTimestamp } from '../../../helpers/formatHelpers';

export default {
  default: [
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
      name: 'commonName',
      messages: defineMessages({
        label: {
          id: 'column.pottag.default.commonName',
          defaultMessage: 'Common Name',
        },
      }),
      sortBy: 'pottags_common:commonName',
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
