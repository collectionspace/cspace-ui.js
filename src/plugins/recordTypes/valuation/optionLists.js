import { defineMessages } from 'react-intl';

// FIXME: Plugins shouldn't have to import react-intl, since this unnecessarily increases the size
// when built as a standalone package. Instead, defineMessages should be supplied in the
// pluginContext. But this means that messages won't be extracted by the Babel plugin, since it
// only operates on files that import react-intl.

export default {
  valueTypes: {
    values: [
      'Current Value',
      'Original Value',
      'Replacement Value',
    ],
    messages: defineMessages({
      'Current Value': {
        id: 'option.valueTypes.Current Value',
        defaultMessage: 'current value',
      },
      'Original Value': {
        id: 'option.valueTypes.Original Value',
        defaultMessage: 'original value',
      },
      'Replacement Value': {
        id: 'option.valueTypes.Replacement Value',
        defaultMessage: 'replacement value',
      },
    }),
  },
};
