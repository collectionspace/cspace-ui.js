import { defineMessages } from 'react-intl';
import { formatRefName, formatTimestamp } from '../../../helpers/formatHelpers';

export default {
  default: [
    {
      name: 'title',
      messages: defineMessages({
        label: {
          id: 'column.group.default.title',
          defaultMessage: 'Title',
        },
      }),
      sortBy: 'groups_common:title',
      width: 250,
    },
    {
      name: 'owner',
      messages: defineMessages({
        label: {
          id: 'column.group.default.owner',
          defaultMessage: 'Owner',
        },
      }),
      formatValue: formatRefName,
      sortBy: 'groups_common:owner',
      width: 400,
    },
    {
      name: 'updatedAt',
      messages: defineMessages({
        label: {
          id: 'column.group.default.updatedAt',
          defaultMessage: 'Updated',
        },
      }),
      formatValue: formatTimestamp,
      sortBy: 'collectionspace_core:updatedAt',
      width: 150,
    },
  ],
};
