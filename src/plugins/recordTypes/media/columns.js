import { defineMessages } from 'react-intl';
import { formatTimestamp } from '../../../helpers/formatHelpers';
import { thumbnailImage } from '../../../helpers/blobHelpers';

export default {
  default: [
    {
      name: 'blobCsid',
      messages: defineMessages({
        label: {
          id: 'column.media.default.blobCsid',
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
          id: 'column.media.default.identificationNumber',
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
          id: 'column.media.default.title',
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
          id: 'column.media.default.updatedAt',
          defaultMessage: 'Updated',
        },
      }),
      formatValue: formatTimestamp,
      sortBy: 'collectionspace_core:updatedAt',
      width: 150,
    },
  ],
};
