import { defineMessages } from 'react-intl';

export default (pluginContext) => {
  const {
    formatTimestamp,
    formatRefNameAsVocabularyName,
    formatServiceObjectName,
  } = pluginContext.formatHelpers;

  return {
    default: [
      {
        name: 'docName',
        messages: defineMessages({
          label: {
            id: 'column.authority.default.docName',
            defaultMessage: 'Item',
          },
        }),
        width: 200,
      },
      {
        name: 'docType',
        messages: defineMessages({
          label: {
            id: 'column.authority.default.docType',
            defaultMessage: 'Type',
          },
        }),
        formatValue: (value, formatterContext) =>
          formatServiceObjectName(value, formatterContext),
        width: 150,
      },
      {
        name: 'vocabulary',
        dataKey: 'refName',
        messages: defineMessages({
          label: {
            id: 'column.authority.default.vocabulary',
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
            id: 'column.authority.default.updatedAt',
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
