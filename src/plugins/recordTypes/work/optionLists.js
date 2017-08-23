import { defineMessages } from 'react-intl';

// FIXME: Plugins shouldn't have to import react-intl, since this unnecessarily increases the size
// when built as a standalone package. Instead, defineMessages should be supplied in the
// pluginContext. But this means that messages won't be extracted by the Babel plugin, since it
// only operates on files that import react-intl.

export default {
  workTermStatuses: {
    values: [
      'quickaddedneedsattention',
      'inprogress',
      'complete',
    ],
    messages: defineMessages({
      quickaddedneedsattention: {
        id: 'option.workTermStatuses.quickaddedneedsattention',
        defaultMessage: 'quick added, needs attention',
      },
      inprogress: {
        id: 'option.workTermStatuses.inprogress',
        defaultMessage: 'in progress',
      },
      complete: {
        id: 'option.workTermStatuses.complete',
        defaultMessage: 'complete',
      },
    }),
  },
};
