import { defineMessages } from 'react-intl';

// FIXME: Plugins shouldn't have to import react-intl, since this unnecessarily increases the size
// when built as a standalone package. Instead, defineMessages should be supplied in the
// pluginContext. But this means that messages won't be extracted by the Babel plugin, since it
// only operates on files that import react-intl.

export default {
  valueTypes: {
    values: [
      'current-value',
      'original-value',
      'replacement-value',
    ],
    messages: defineMessages({
      'current-value': {
        id: 'option.valueTypes.current-value',
        defaultMessage: 'current value',
      },
      'original-value': {
        id: 'option.valueTypes.original-value',
        defaultMessage: 'original value',
      },
      'replacement-value': {
        id: 'option.valueTypes.replacement-value',
        defaultMessage: 'replacement value',
      },
    }),
  },
};
