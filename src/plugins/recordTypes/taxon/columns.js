import { defineMessages } from 'react-intl';

export default (pluginContext) => {
  const {
    formatRefNameAsVocabularyName,
    formatTimestamp,
  } = pluginContext.formatHelpers;

  return {
    default: [
      {
        name: 'termDisplayName',
        messages: defineMessages({
          label: {
            id: 'column.place.default.termDisplayName',
            defaultMessage: 'Display name',
          },
        }),
        sortBy: 'places_common:placeTermGroupList/0/termDisplayName',
        width: 250,
      },
      {
        name: 'termStatus',
        messages: defineMessages({
          label: {
            id: 'column.place.default.termStatus',
            defaultMessage: 'Term status',
          },
        }),
        sortBy: 'places_common:placeTermGroupList/0/termStatus',
        width: 250,
      },
      {
        name: 'vocabulary',
        dataKey: 'refName',
        messages: defineMessages({
          label: {
            id: 'column.place.default.vocabulary',
            defaultMessage: 'Vocabulary',
          },
        }),
        formatValue: (value, formatterContext) =>
          formatRefNameAsVocabularyName(value, formatterContext),
        width: 150,
      },
      {
        name: 'updatedAt',
        messages: defineMessages({
          label: {
            id: 'column.place.search.updatedAt',
            defaultMessage: 'Updated',
          },
        }),
        formatValue: formatTimestamp,
        sortBy: 'collectionspace_core:updatedAt',
        width: 150,
      },
    ],
  };
};
