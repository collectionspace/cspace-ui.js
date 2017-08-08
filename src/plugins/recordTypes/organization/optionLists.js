import { defineMessages } from 'react-intl';

// FIXME: Plugins shouldn't have to import react-intl, since this unnecessarily increases the size
// when built as a standalone package. Instead, defineMessages should be supplied in the
// pluginContext. But this means that messages won't be extracted by the Babel plugin, since it
// only operates on files that import react-intl.

export default {
  orgTermType: {
    values: [
      'descriptor',
      'alternate-descriptor',
      'used-for-term',
    ],
    messages: defineMessages({
      descriptor: {
        id: 'option.orgTermType.descriptor',
        defaultMessage: 'descriptor',
      },
      'alternate-descriptor': {
        id: 'option.orgTermType.alternate-descriptor',
        defaultMessage: 'alternate descriptor',
      },
      'used-for-term': {
        id: 'option.orgTermType.used-for-term',
        defaultMessage: 'used for term',
      },
    }),
  },
  orgTermStatus: {
    values: [
      'provisional',
      'under-review',
      'accepted',
      'rejected',
    ],
    messages: defineMessages({
      provisional: {
        id: 'option.orgTermStatus.provisional',
        defaultMessage: 'provisional',
      },
      'under-review': {
        id: 'option.orgTermStatus.under-review',
        defaultMessage: 'under review',
      },
      accepted: {
        id: 'option.orgTermStatus.accepted',
        defaultMessage: 'accepted',
      },
      rejected: {
        id: 'option.orgTermStatus.rejected',
        defaultMessage: 'rejected',
      },
    }),
  },
};
