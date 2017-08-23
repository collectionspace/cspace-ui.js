import { defineMessages } from 'react-intl';

// FIXME: Plugins shouldn't have to import react-intl, since this unnecessarily increases the size
// when built as a standalone package. Instead, defineMessages should be supplied in the
// pluginContext. But this means that messages won't be extracted by the Babel plugin, since it
// only operates on files that import react-intl.

export default {
  entryReasons: {
    values: [
      'enquiry',
      'consideration',
      'commission',
      'loan',
    ],
    messages: defineMessages({
      enquiry: {
        id: 'option.entryReasons.enquiry',
        defaultMessage: 'enquiry',
      },
      consideration: {
        id: 'option.entryReasons.consideration',
        defaultMessage: 'consideration',
      },
      commission: {
        id: 'option.entryReasons.commission',
        defaultMessage: 'commission',
      },
      loan: {
        id: 'option.entryReasons.loan',
        defaultMessage: 'loan',
      },
    }),
  },
};
