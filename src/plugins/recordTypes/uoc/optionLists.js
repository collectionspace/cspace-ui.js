import { defineMessages } from 'react-intl';

export default {
  authorizationStatuses: {
    values: [
      'approved',
      'not approved',
      'not decided',
    ],
    messages: defineMessages({
      approved: {
        id: 'option.authorizationStatuses.approved',
        defaultMessage: 'approved',
      },
      'not approved': {
        id: 'option.authorizationStatuses.not approved',
        defaultMessage: 'not approved',
      },
      'not decided': {
        id: 'option.authorizationStatuses.not decided',
        defaultMessage: 'not decided',
      },
    }),
  },
};
