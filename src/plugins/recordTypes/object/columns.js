import { defineMessages } from 'react-intl';
import { formatLocalDateTime } from '../../../helpers/dateHelpers';

export default {
  search: [
    {
      name: 'objectNumber',
      messages: defineMessages({
        label: {
          id: 'column.object.search.objectNumber',
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
          id: 'column.object.search.title',
          defaultMessage: 'Title',
        },
      }),
      sortBy: 'collectionobjects_common:titleGroupList/0/title',
      width: 450,
    },
    {
      name: 'updatedAt',
      messages: defineMessages({
        label: {
          id: 'column.object.search.updatedAt',
          defaultMessage: 'Updated',
        },
      }),
      formatValue: formatLocalDateTime,
      sortBy: 'collectionspace_core:updatedAt',
      width: 150,
    },
  ],
  related: [
    {
      name: 'objectNumber',
      messages: defineMessages({
        label: {
          id: 'column.object.related.objectNumber',
          defaultMessage: 'ID',
        },
      }),
      sortBy: 'collectionobjects_common:objectNumber',
      width: 200,
    },
    {
      name: 'title',
      messages: defineMessages({
        label: {
          id: 'column.object.related.title',
          defaultMessage: 'Title',
        },
      }),
      width: 450,
    },
    {
      name: 'updatedAt',
      messages: defineMessages({
        label: {
          id: 'column.object.related.updatedAt',
          defaultMessage: 'Updated',
        },
      }),
      formatValue: formatLocalDateTime,
      sortBy: 'collectionspace_core:updatedAt',
      width: 150,
    },
  ],
};
