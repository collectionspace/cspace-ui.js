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
      width: 200,
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
      width: 400,
    },
    {
      name: 'updatedAt',
      messages: defineMessages({
        label: {
          id: 'column.group.updatedAt',
          defaultMessage: 'Last modified',
        },
      }),
      formatValue: formatLocalDateTime,
      width: 200,
    },
  ],
};
