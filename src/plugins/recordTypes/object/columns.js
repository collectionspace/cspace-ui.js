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
      width: 150,
    },
    {
      name: 'title',
      messages: defineMessages({
        label: {
          id: 'column.object.title',
          defaultMessage: 'Title',
        },
      }),
      width: 450,
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
      width: 200,
    },
  ],
};
