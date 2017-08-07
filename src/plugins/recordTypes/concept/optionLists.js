import { defineMessages } from 'react-intl';

// FIXME: Plugins shouldn't have to import react-intl, since this unnecessarily increases the size
// when built as a standalone package. Instead, defineMessages should be supplied in the
// pluginContext. But this means that messages won't be extracted by the Babel plugin, since it
// only operates on files that import react-intl.

export default {
  conceptTermStatus: {
    values: [
      'provisional',
      'under-review',
      'accepted',
      'rejected',
    ],
    messages: defineMessages({
      provisional: {
        id: 'option.conceptTermStatus.provisional',
        defaultMessage: 'provisional',
      },
      'under-review': {
        id: 'option.conceptTermStatus.under-review',
        defaultMessage: 'under review',
      },
      accepted: {
        id: 'option.conceptTermStatus.accepted',
        defaultMessage: 'accepted',
      },
      rejected: {
        id: 'option.conceptTermStatus.rejected',
        defaultMessage: 'rejected',
      },
    }),
  },
  conceptTermType: {
    values: [
      'descriptor',
      'alternate-descriptor',
      'used-for-term',
    ],
    messages: defineMessages({
      descriptor: {
        id: 'option.conceptTermType.descriptor',
        defaultMessage: 'descriptor',
      },
      'alternate-descriptor': {
        id: 'option.conceptTermType.alternate-descriptor',
        defaultMessage: 'alternate descriptor',
      },
      'used-for-term': {
        id: 'option.conceptTermType.used-for-term',
        defaultMessage: 'used for term',
      },
    }),
  },
  conceptHistoricalStatus: {
    values: [
      'current',
      'historical',
      'both',
      'unknown',
    ],
    messages: defineMessages({
      current: {
        id: 'option.conceptHistoricalStatus.current',
        defaultMessage: 'current',
      },
      historical: {
        id: 'option.conceptHistoricalStatus.historical',
        defaultMessage: 'historical',
      },
      both: {
        id: 'option.conceptHistoricalStatus.both',
        defaultMessage: 'both',
      },
      unknown: {
        id: 'option.conceptHistoricalStatus.unknown',
        defaultMessage: 'unknown',
      },
    }),
  },
};
