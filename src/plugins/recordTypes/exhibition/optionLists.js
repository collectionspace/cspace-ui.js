import { defineMessages } from 'react-intl';

// FIXME: Plugins shouldn't have to import react-intl, since this unnecessarily increases the size
// when built as a standalone package. Instead, defineMessages should be supplied in the
// pluginContext. But this means that messages won't be extracted by the Babel plugin, since it
// only operates on files that import react-intl.

export default {
  exhibitionConsTreatmentStatuses: {
    values: [
      'needed',
      'not-needed',
      'done',
    ],
    messages: defineMessages({
      needed: {
        id: 'option.exhibitionConsTreatmentStatuses.needed',
        defaultMessage: 'needed',
      },
      'not-needed': {
        id: 'option.exhibitionConsTreatmentStatuses.not-needed',
        defaultMessage: 'not needed',
      },
      done: {
        id: 'option.exhibitionConsTreatmentStatuses.done',
        defaultMessage: 'done',
      },
    }),
  },
  exhibitionMountStatuses: {
    values: [
      'needed',
      'not-needed',
      'done',
    ],
    messages: defineMessages({
      needed: {
        id: 'option.exhibitionMountStatuses.needed',
        defaultMessage: 'needed',
      },
      'not-needed': {
        id: 'option.exhibitionMountStatuses.not-needed',
        defaultMessage: 'not needed',
      },
      done: {
        id: 'option.exhibitionMountStatuses.done',
        defaultMessage: 'done',
      },
    }),
  },
};
