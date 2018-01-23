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
            id: 'column.organization.default.termDisplayName',
            defaultMessage: 'Display name',
          },
        }),
        order: 20,
        sortBy: 'organizations_common:orgTermGroupList/0/termDisplayName',
        width: 250,
      },
      termStatus: {
        formatValue: (data, formatterContext) =>
          formatOption('orgTermStatuses', data, formatterContext),
        messages: defineMessages({
          label: {
            id: 'column.organization.default.termStatus',
            defaultMessage: 'Term status',
          },
        }),
        order: 30,
        sortBy: 'organizations_common:orgTermGroupList/0/termStatus',
        width: 250,
      },
      vocabulary: {
        dataKey: 'refName',
        formatValue: (value, formatterContext) =>
          formatRefNameAsVocabularyName(value, formatterContext),
        messages: defineMessages({
          label: {
            id: 'column.organization.default.vocabulary',
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
            id: 'column.organization.search.updatedAt',
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
