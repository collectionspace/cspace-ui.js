import { defineMessages } from 'react-intl';

// FIXME: Plugins shouldn't have to import react-intl, since this unnecessarily increases the size
// when built as a standalone package. Instead, defineMessages should be supplied in the
// pluginContext. But this means that messages won't be extracted by the Babel plugin, since it
// only operates on files that import react-intl.

export default {
  record: defineMessages({
    recordNameTitle: {
      id: 'record.media.nameTitle',
      description: 'The name of the record when used as a title.',
      defaultMessage: 'Media Handling',
    },
    resultsTitle: {
      id: 'record.media.resultsTitle',
      description: 'The name of the record when used as a title describing search results.',
      defaultMessage: 'Media Handling',
    },
  }),
};
