import { defineMessages } from 'react-intl';

// FIXME: Plugins shouldn't have to import react-intl, since this unnecessarily increases the size
// when built as a standalone package. Instead, defineMessages should be supplied in the
// configContext. But this means that messages won't be extracted by the Babel plugin, since it
// only operates on files that import react-intl.

export default {
  printLabelOptions: {
    values: [
      'yes',
      'no',
    ],
    messages: defineMessages({
      yes: {
        id: 'option.printLabelOptions.yes',
        defaultMessage: 'yes',
      },
      no: {
        id: 'option.printLabelOptions.no',
        defaultMessage: 'no',
      },
    }),
  },
};
