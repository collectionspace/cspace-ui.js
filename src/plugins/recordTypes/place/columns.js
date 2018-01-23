import { defineMessages } from 'react-intl';

export default (pluginContext) => {
  const {
    formatOption,
    formatRefNameAsVocabularyName,
    formatTimestamp,
    formatWorkflowStateIcon,
  } = pluginContext.formatHelpers;

  return {
    default: {
      workflowState: {
        flexGrow: 0,
        flexShrink: 0,
        formatValue: formatWorkflowStateIcon,
        order: 10,
        width: 32,
      },
      termDisplayName: {
        messages: defineMessages({
          label: {
            id: 'column.place.default.termDisplayName',
            defaultMessage: 'Display name',
          },
        }),
        order: 20,
        sortBy: 'places_common:placeTermGroupList/0/termDisplayName',
        width: 250,
      },
      termStatus: {
        formatValue: (data, formatterContext) =>
          formatOption('placeTermStatuses', data, formatterContext),
        messages: defineMessages({
          label: {
            id: 'column.place.default.termStatus',
            defaultMessage: 'Term status',
          },
        }),
        order: 30,
        sortBy: 'places_common:placeTermGroupList/0/termStatus',
        width: 250,
      },
      vocabulary: {
        dataKey: 'refName',
        formatValue: formatRefNameAsVocabularyName,
        messages: defineMessages({
          label: {
            id: 'column.place.default.vocabulary',
            defaultMessage: 'Vocabulary',
          },
        }),
        order: 40,
        width: 150,
      },
      updatedAt: {
        formatValue: formatTimestamp,
        messages: defineMessages({
          label: {
            id: 'column.place.search.updatedAt',
            defaultMessage: 'Updated',
          },
        }),
        order: 50,
        sortBy: 'collectionspace_core:updatedAt',
        width: 150,
      },
    },
  };
};
