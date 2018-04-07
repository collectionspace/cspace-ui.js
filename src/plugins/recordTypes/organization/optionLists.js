import { defineMessages } from 'react-intl';

export default {
  orgTermTypes: {
    values: [
      'descriptor',
      'alternate descriptor',
      'used for term',
    ],
    messages: defineMessages({
      descriptor: {
        id: 'option.orgTermTypes.descriptor',
        defaultMessage: 'descriptor',
      },
      'alternate descriptor': {
        id: 'option.orgTermTypes.alternate descriptor',
        defaultMessage: 'alternate descriptor',
      },
      'used for term': {
        id: 'option.orgTermTypes.used for term',
        defaultMessage: 'used for term',
      },
    }),
  },
  orgTermStatuses: {
    values: [
      'provisional',
      'under review',
      'accepted',
      'rejected',
    ],
    messages: defineMessages({
      provisional: {
        id: 'option.orgTermStatuses.provisional',
        defaultMessage: 'provisional',
      },
      'under review': {
        id: 'option.orgTermStatuses.under review',
        defaultMessage: 'under review',
      },
      accepted: {
        id: 'option.orgTermStatuses.accepted',
        defaultMessage: 'accepted',
      },
      rejected: {
        id: 'option.orgTermStatuses.rejected',
        defaultMessage: 'rejected',
      },
    }),
  },
};
