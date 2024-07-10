import { defineMessages } from 'react-intl';

export default {
  mediaTypes: {
    values: [
      'dataset',
      'document',
      'moving_image',
      'still_image',
      'sound',
    ],
    messages: defineMessages({
      dataset: {
        id: 'option.mediaTypes.dataset',
        defaultMessage: 'dataset',
      },
      document: {
        id: 'option.mediaTypes.document',
        defaultMessage: 'document',
      },
      moving_image: {
        id: 'option.mediaTypes.moving_image',
        defaultMessage: 'moving image',
      },
      still_image: {
        id: 'option.mediaTypes.still_image',
        defaultMessage: 'still image',
      },
      sound: {
        id: 'option.mediaTypes.sound',
        defaultMessage: 'sound',
      },
    }),
  },
};
