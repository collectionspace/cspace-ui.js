import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    formatOption,
    formatRefNameAsVocabularyName,
    formatTimestamp,
    formatWorkflowStateIcon,
  } = configContext.formatHelpers;

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
            id: 'column.citation.default.termDisplayName',
            defaultMessage: 'Display name',
          },
        }),
        order: 20,
        sortBy: 'citations_common:citationTermGroupList/0/termDisplayName',
        width: 250,
      },
      termStatus: {
        formatValue: (data, formatterContext) =>
          formatOption('citationTermStatuses', data, formatterContext),
        messages: defineMessages({
          label: {
            id: 'column.citation.default.termStatus',
            defaultMessage: 'Term status',
          },
        }),
        order: 30,
        sortBy: 'citations_common:citationTermGroupList/0/termStatus',
        width: 250,
      },
      vocabulary: {
        dataKey: 'refName',
        formatValue: formatRefNameAsVocabularyName,
        messages: defineMessages({
          label: {
            id: 'column.citation.default.vocabulary',
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
            id: 'column.citation.search.updatedAt',
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
