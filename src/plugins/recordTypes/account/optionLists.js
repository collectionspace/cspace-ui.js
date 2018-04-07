import { defineMessages } from 'react-intl';

export default {
  accountStatuses: {
    values: [
      'active',
      'inactive',
    ],
    messages: defineMessages({
      active: {
        id: 'option.accountStatuses.active',
        defaultMessage: 'active',
      },
      inactive: {
        id: 'option.accountStatuses.inactive',
        defaultMessage: 'inactive',
      },
    }),
  },
};
