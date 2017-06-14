import { defineMessages } from 'react-intl';
import { formatTimestamp } from '../../../helpers/formatHelpers';

export default {
  default: [
    {
      name: 'exhibitionNumber',
      messages: defineMessages({
        label: {
          id: 'column.exhibition.default.exhibitionNumber',
          defaultMessage: 'Exhibition number',
        },
      }),
      sortBy: 'exhibitions_common:exhibitionNumber',
      width: 200,
    },
    {
      name: 'title',
      messages: defineMessages({
        label: {
          id: 'column.exhibition.default.title',
          defaultMessage: 'Title',
        },
      }),
      sortBy: 'exhibitions_common:title',
      width: 450,
    },
    {
      name: 'updatedAt',
      messages: defineMessages({
        label: {
          id: 'column.exhibition.default.updatedAt',
          defaultMessage: 'Updated',
        },
      }),
      formatValue: formatTimestamp,
      sortBy: 'collectionspace_core:updatedAt',
      width: 150,
    },
  ],
};
