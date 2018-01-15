import { defineMessages } from 'react-intl';

export default {
  vocabTermStatuses: {
    values: [
      'active',
      'inactive',
    ],
    messages: defineMessages({
      active: {
        id: 'option.vocabTermStatuses.active',
        defaultMessage: 'active',
      },
      inactive: {
        id: 'option.vocabTermStatuses.inactive',
        defaultMessage: 'inactive',
      },
    }),
  },
};
