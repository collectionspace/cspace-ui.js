import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    formatTimestamp,
  } = configContext.formatHelpers;

  return {
    default: {
      documentationNumber: {
        messages: defineMessages({
          label: {
            id: 'column.summarydocumentation.default.documentationNumber',
            defaultMessage: 'Summary number',
          },
        }),
        order: 10,
        sortBy: 'summarydocumentations_common:documentationNumber',
        width: 200,
      },
      title: {
        messages: defineMessages({
          label: {
            id: 'column.summarydocumentation.default.title',
            defaultMessage: 'Title',
          },
        }),
        order: 20,
        sortBy: 'summarydocumentations_common:titles/title/0',
        width: 200,
      },
      updatedAt: {
        formatValue: formatTimestamp,
        messages: defineMessages({
          label: {
            id: 'column.summarydocumentation.default.updatedAt',
            defaultMessage: 'Updated',
          },
        }),
        order: 30,
        sortBy: 'collectionspace_core:updatedAt',
        width: 150,
      },
    },
  };
};
