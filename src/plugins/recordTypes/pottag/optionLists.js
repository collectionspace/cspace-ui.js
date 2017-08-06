import { defineMessages } from 'react-intl';

// FIXME: Plugins shouldn't have to import react-intl, since this unnecessarily increases the size
// when built as a standalone package. Instead, defineMessages should be supplied in the
// pluginContext. But this means that messages won't be extracted by the Babel plugin, since it
// only operates on files that import react-intl.

export default {
  printLabels: {
    values: [
      'yes',
      'no',
    ],
    messages: defineMessages({
      yes: {
        id: 'option.printLabels.yes',
        defaultMessage: 'yes',
      },
      no: {
        id: 'option.printLabels.no',
        defaultMessage: 'no',
      },
    }),
  },
};
