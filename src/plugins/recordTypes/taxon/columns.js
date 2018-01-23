import { defineMessages } from 'react-intl';

export default (pluginContext) => {
  const {
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
            id: 'column.taxon.default.termDisplayName',
            defaultMessage: 'Display name',
          },
        }),
        order: 20,
        sortBy: 'taxon_common:taxonTermGroupList/0/termDisplayName',
        width: 250,
      },
      termStatus: {
        messages: defineMessages({
          label: {
            id: 'column.taxon.default.termStatus',
            defaultMessage: 'Term status',
          },
        }),
        order: 30,
        sortBy: 'taxon_common:taxonTermGroupList/0/termStatus',
        width: 250,
      },
      vocabulary: {
        dataKey: 'refName',
        formatValue: formatRefNameAsVocabularyName,
        messages: defineMessages({
          label: {
            id: 'column.taxon.default.vocabulary',
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
            id: 'column.taxon.search.updatedAt',
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
