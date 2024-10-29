import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    formatTimestamp,
    thumbnailImage,
  } = configContext.formatHelpers;

  return {
    default: {
      blobCsid: {
        formatValue: thumbnailImage,
        messages: defineMessages({
          label: {
            id: 'column.restrictedmedia.default.blobCsid',
            defaultMessage: 'Thumbnail',
          },
        }),
        order: 10,
        width: 70,
      },
      identificationNumber: {
        messages: defineMessages({
          label: {
            id: 'column.restrictedmedia.default.identificationNumber',
            defaultMessage: 'Identification number',
          },
        }),
        order: 20,
        sortBy: 'restrictedmedia_common:identificationNumber',
        width: 200,
      },
      title: {
        messages: defineMessages({
          label: {
            id: 'column.restrictedmedia.default.title',
            defaultMessage: 'Title',
          },
        }),
        order: 30,
        sortBy: 'restrictedmedia_common:title',
        width: 380,
      },
      updatedAt: {
        formatValue: formatTimestamp,
        messages: defineMessages({
          label: {
            id: 'column.restrictedmedia.default.updatedAt',
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
