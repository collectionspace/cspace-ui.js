import { defineMessages } from 'react-intl';

// FIXME: Plugins shouldn't have to import react-intl, since this unnecessarily increases the size
// when built as a standalone package. Instead, defineMessages should be supplied in the
// pluginContext. But this means that messages won't be extracted by the Babel plugin, since it
// only operates on files that import react-intl.

export default {
  exhibitionObjectConsTreatment: {
    values: [
      'needed',
      'not-needed',
      'done',
    ],
    messages: defineMessages({
      needed: {
        id: 'option.exhibitionObjectConsTreatment.needed',
        defaultMessage: 'needed',
      },
      'not-needed': {
        id: 'option.exhibitionObjectConsTreatment.not-needed',
        defaultMessage: 'not needed',
      },
      done: {
        id: 'option.exhibitionObjectConsTreatment.done',
        defaultMessage: 'done',
      },
    }),
  },
  exhibitionObjectMount: {
    values: [
      'needed',
      'not-needed',
      'done',
    ],
    messages: defineMessages({
      needed: {
        id: 'option.exhibitionObjectMount.needed',
        defaultMessage: 'needed',
      },
      'not-needed': {
        id: 'option.exhibitionObjectMount.not-needed',
        defaultMessage: 'not needed',
      },
      done: {
        id: 'option.exhibitionObjectMount.done',
        defaultMessage: 'done',
      },
    }),
  }
};
