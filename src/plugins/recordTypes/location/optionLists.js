import { defineMessages } from 'react-intl';

// FIXME: Plugins shouldn't have to import react-intl, since this unnecessarily increases the size
// when built as a standalone package. Instead, defineMessages should be supplied in the
// pluginContext. But this means that messages won't be extracted by the Babel plugin, since it
// only operates on files that import react-intl.

export default {
  termType: {
    values: [
      'descriptor',
      'alternate-descriptor',
      'used-for-term',
    ],
    messages: defineMessages({
      descriptor: {
        id: 'option.termType.descriptor',
        defaultMessage: 'descriptor',
      },
      'alternate-descriptor': {
        id: 'option.termType.alternate-descriptor',
        defaultMessage: 'alternate descriptor',
      },
      'used-for-term': {
        id: 'option.termType.used-for-term',
        defaultMessage: 'used for term',
      },
    }),
  },
  termStatus: {
    values: [
      'provisional',
      'under-review',
      'accepted',
      'rejected',
    ],
    messages: defineMessages({
      provisional: {
        id: 'option.termStatus.provisional',
        defaultMessage: 'provisional',
      },
      'under-review': {
        id: 'option.termStatus.under-review',
        defaultMessage: 'under review',
      },
      accepted: {
        id: 'option.termStatus.accepted',
        defaultMessage: 'accepted',
      },
      rejected: {
        id: 'option.termStatus.rejected',
        defaultMessage: 'rejected',
      },
    }),
  },
};
