import { defineMessages } from 'react-intl';

export default {
  locationTermTypes: {
    values: [
      'descriptor',
      'alternate descriptor',
      'used for term',
    ],
    messages: defineMessages({
      descriptor: {
        id: 'option.locationTermTypes.descriptor',
        defaultMessage: 'descriptor',
      },
      'alternate descriptor': {
        id: 'option.locationTermTypes.alternate descriptor',
        defaultMessage: 'alternate descriptor',
      },
      'used for term': {
        id: 'option.locationTermTypes.used for term',
        defaultMessage: 'used for term',
      },
    }),
  },
  locationTermStatuses: {
    values: [
      'provisional',
      'under review',
      'accepted',
      'rejected',
    ],
    messages: defineMessages({
      provisional: {
        id: 'option.locationTermStatuses.provisional',
        defaultMessage: 'provisional',
      },
      'under review': {
        id: 'option.locationTermStatuses.under review',
        defaultMessage: 'under review',
      },
      accepted: {
        id: 'option.locationTermStatuses.accepted',
        defaultMessage: 'accepted',
      },
      rejected: {
        id: 'option.locationTermStatuses.rejected',
        defaultMessage: 'rejected',
      },
    }),
  },
};
