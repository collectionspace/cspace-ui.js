import { defineMessages } from 'react-intl';
import { getDisplayName } from 'cspace-refname';
import { formatLocalDateTime } from '../../../helpers/dateHelpers';

export default {
  search: [
    {
      name: 'title',
      messages: defineMessages({
        label: {
          id: 'column.group.title',
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
          id: 'column.group.owner',
          defaultMessage: 'Owner',
        },
      }),
      formatValue: value => getDisplayName(value),
      sortBy: 'groups_common:owner',
      width: 400,
    },
    {
      name: 'updatedAt',
      messages: defineMessages({
        label: {
          id: 'column.group.updatedAt',
          defaultMessage: 'Updated',
        },
      }),
      formatValue: formatLocalDateTime,
      sortBy: 'collectionspace_core:updatedAt',
      width: 150,
    },
  ],
};
