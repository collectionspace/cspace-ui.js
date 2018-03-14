import { defineMessages } from 'react-intl';

// FIXME: Plugins shouldn't have to import react-intl, since this unnecessarily increases the size
// when built as a standalone package. Instead, defineMessages should be supplied in the
// configContext. But this means that messages won't be extracted by the Babel plugin, since it
// only operates on files that import react-intl.

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
