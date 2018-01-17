import { defineMessages } from 'react-intl';

export default (pluginContext) => {
  const {
    formatRefNameAsVocabularyName,
    formatTimestamp,
    formatWorkflowStateIcon,
  } = pluginContext.formatHelpers;

  return {
    default: [
      {
        name: 'workflowState',
        formatValue: formatWorkflowStateIcon,
        width: 32,
        flexGrow: 0,
        flexShrink: 0,
      },
      {
        name: 'termDisplayName',
        messages: defineMessages({
          label: {
            id: 'column.taxon.default.termDisplayName',
            defaultMessage: 'Display name',
          },
        }),
        sortBy: 'taxon_common:taxonTermGroupList/0/termDisplayName',
        width: 250,
      },
      {
        name: 'termStatus',
        messages: defineMessages({
          label: {
            id: 'column.taxon.default.termStatus',
            defaultMessage: 'Term status',
          },
        }),
        sortBy: 'taxon_common:taxonTermGroupList/0/termStatus',
        width: 250,
      },
      {
        name: 'vocabulary',
        dataKey: 'refName',
        messages: defineMessages({
          label: {
            id: 'column.taxon.default.vocabulary',
            defaultMessage: 'Vocabulary',
          },
        }),
        formatValue: formatRefNameAsVocabularyName,
        width: 150,
      },
      {
        name: 'updatedAt',
        messages: defineMessages({
          label: {
            id: 'column.taxon.search.updatedAt',
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
