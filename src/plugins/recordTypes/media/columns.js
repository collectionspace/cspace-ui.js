import { defineMessages } from 'react-intl';
import { thumbnailImage } from '../../../helpers/blobHelpers';

export default (pluginContext) => {
  const {
    formatTimestamp,
  } = pluginContext.formatHelpers;

  return {
    default: {
      blobCsid: {
        formatValue: thumbnailImage,
        messages: defineMessages({
          label: {
            id: 'column.media.default.blobCsid',
            defaultMessage: 'Thumbnail',
          },
        }),
        order: 10,
        width: 70,
      },
      identificationNumber: {
        messages: defineMessages({
          label: {
            id: 'column.media.default.identificationNumber',
            defaultMessage: 'Identification number',
          },
        }),
        order: 20,
        sortBy: 'media_common:identificationNumber',
        width: 200,
      },
      title: {
        messages: defineMessages({
          label: {
            id: 'column.media.default.title',
            defaultMessage: 'Title',
          },
        }),
        order: 30,
        sortBy: 'media_common:title',
        width: 380,
      },
      updatedAt: {
        formatValue: formatTimestamp,
        messages: defineMessages({
          label: {
            id: 'column.media.default.updatedAt',
            defaultMessage: 'Updated',
          },
        }),
        order: 40,
        sortBy: 'collectionspace_core:updatedAt',
        width: 150,
      },
    },
    narrow: {
      blobCsid: {
        formatValue: thumbnailImage,
        messages: defineMessages({
          label: {
            id: 'column.media.narrow.blobCsid',
            defaultMessage: 'Thumb',
          },
        }),
        order: 10,
        width: 70,
      },
      identificationNumber: {
        messages: defineMessages({
          label: {
            id: 'column.media.narrow.identificationNumber',
            defaultMessage: 'ID',
          },
        }),
        order: 20,
        sortBy: 'media_common:identificationNumber',
        width: 200,
      },
      title: {
        messages: defineMessages({
          label: {
            id: 'column.media.narrow.title',
            defaultMessage: 'Title',
          },
        }),
        order: 30,
        sortBy: 'media_common:title',
        width: 380,
      },
      updatedAt: {
        formatValue: formatTimestamp,
        messages: defineMessages({
          label: {
            id: 'column.media.narrow.updatedAt',
            defaultMessage: 'Updated',
          },
        }),
        order: 40,
        sortBy: 'collectionspace_core:updatedAt',
        width: 150,
      },
    },
  };
};
