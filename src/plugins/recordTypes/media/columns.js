import { defineMessages } from 'react-intl';
import { formatLocalDateTime } from '../../../helpers/dateHelpers';
import { thumbnailImage } from '../../../helpers/blobHelpers';

export default {
  search: [
    {
      name: 'blobCsid',
      messages: defineMessages({
        label: {
          id: 'column.media.blobCsid',
          defaultMessage: 'Thumbnail',
        },
      }),
      formatValue: thumbnailImage,
      width: 70,
    },
    {
      name: 'identificationNumber',
      messages: defineMessages({
        label: {
          id: 'column.media.identificationNumber',
          defaultMessage: 'Identification number',
        },
      }),
      sortBy: 'media_common:identificationNumber',
      width: 200,
    },
    {
      name: 'title',
      messages: defineMessages({
        label: {
          id: 'column.media.title',
          defaultMessage: 'Title',
        },
      }),
      sortBy: 'media_common:title',
      width: 380,
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
      sortBy: 'collectionspace_core:updatedAt',
      width: 150,
    },
  ],
};
