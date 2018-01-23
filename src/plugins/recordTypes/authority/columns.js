import { defineMessages } from 'react-intl';

export default (pluginContext) => {
  const {
    formatTimestamp,
    formatRefNameAsVocabularyName,
    formatServiceObjectName,
  } = pluginContext.formatHelpers;

  return {
    default: {
      docName: {
        messages: defineMessages({
          label: {
            id: 'column.authority.default.docName',
            defaultMessage: 'Item',
          },
        }),
        order: 10,
        width: 200,
      },
      docType: {
        formatValue: formatServiceObjectName,
        messages: defineMessages({
          label: {
            id: 'column.authority.default.docType',
            defaultMessage: 'Type',
          },
        }),
        order: 20,
        width: 150,
      },
      vocabulary: {
        dataKey: 'refName',
        formatValue: formatRefNameAsVocabularyName,
        messages: defineMessages({
          label: {
            id: 'column.authority.default.vocabulary',
            defaultMessage: 'Vocabulary',
          },
        }),
        order: 30,
        width: 150,
      },
      updatedAt: {
        formatValue: formatTimestamp,
        messages: defineMessages({
          label: {
            id: 'column.authority.default.updatedAt',
            defaultMessage: 'Updated',
          },
        }),
        order: 40,
        sortBy: 'collectionspace_core:updatedAt',
        width: 150,
      },
    },
  };
};
