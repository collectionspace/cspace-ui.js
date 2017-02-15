import { defineMessages } from 'react-intl';
import { formatTimestamp } from '../../../helpers/formatHelpers';

export default {
  default: [
    {
      name: 'objectNumber',
      messages: defineMessages({
        label: {
          id: 'column.collectionobject.default.objectNumber',
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
          id: 'column.collectionobject.default.title',
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
          id: 'column.collectionobject.default.updatedAt',
          defaultMessage: 'Updated',
        },
      }),
      formatValue: formatTimestamp,
      sortBy: 'collectionspace_core:updatedAt',
      width: 150,
    },
  ],
  narrow: [
    {
      name: 'objectNumber',
      messages: defineMessages({
        label: {
          id: 'column.collectionobject.narrow.objectNumber',
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
          id: 'column.collectionobject.narrow.title',
          defaultMessage: 'Title',
        },
      }),
      width: 450,
    },
    {
      name: 'updatedAt',
      messages: defineMessages({
        label: {
          id: 'column.collectionobject.narrow.updatedAt',
          defaultMessage: 'Updated',
        },
      }),
      formatValue: formatTimestamp,
      sortBy: 'collectionspace_core:updatedAt',
      width: 150,
    },
  ],
};
