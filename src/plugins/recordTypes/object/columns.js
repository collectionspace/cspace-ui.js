import { defineMessages } from 'react-intl';
import { formatLocalDateTime } from '../../../helpers/dateHelpers';

export default {
  search: [
    {
      name: 'objectNumber',
      messages: defineMessages({
        label: {
          id: 'column.object.objectNumber',
          defaultMessage: 'Identification number',
        },
      }),
      sortBy: 'collectionobjects_common:objectNumber',
      width: 200,
    },
    {
      name: 'title',
      messages: defineMessages({
        label: {
          id: 'column.object.title',
          defaultMessage: 'Title',
        },
      }),
      sortBy: 'collectionobjects_common:titleGroupList/0/title',
      width: 400,
    },
    {
      name: 'updatedAt',
      messages: defineMessages({
        label: {
          id: 'column.object.updatedAt',
          defaultMessage: 'Last modified',
        },
      }),
      formatValue: formatLocalDateTime,
      sortBy: 'collectionspace_core:updatedAt',
      width: 200,
    },
  ],
};
