import { defineMessages } from 'react-intl';

export default {
  citationTermStatuses: {
    values: [
      'provisional',
      'under review',
      'accepted',
      'rejected',
    ],
    messages: defineMessages({
      provisional: {
        id: 'option.citationTermStatuses.provisional',
        defaultMessage: 'provisional',
      },
      'under review': {
        id: 'option.citationTermStatuses.under review',
        defaultMessage: 'under review',
      },
      accepted: {
        id: 'option.citationTermStatuses.accepted',
        defaultMessage: 'accepted',
      },
      rejected: {
        id: 'option.citationTermStatuses.rejected',
        defaultMessage: 'rejected',
      },
    }),
  },
};
