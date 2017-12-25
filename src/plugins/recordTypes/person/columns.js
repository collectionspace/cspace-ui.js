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
            id: 'column.person.default.termDisplayName',
            defaultMessage: 'Display name',
          },
        }),
        sortBy: 'persons_common:personTermGroupList/0/termDisplayName',
        width: 250,
      },
      {
        name: 'surName',
        messages: defineMessages({
          label: {
            id: 'column.person.default.surName',
            defaultMessage: 'Surname',
          },
        }),
        sortBy: 'persons_common:personTermGroupList/0/surName',
        width: 125,
      },
      {
        name: 'foreName',
        messages: defineMessages({
          label: {
            id: 'column.person.default.foreName',
            defaultMessage: 'Forename',
          },
        }),
        sortBy: 'persons_common:personTermGroupList/0/foreName',
        width: 125,
      },
      {
        name: 'vocabulary',
        dataKey: 'refName',
        messages: defineMessages({
          label: {
            id: 'column.person.default.vocabulary',
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
            id: 'column.object.search.updatedAt',
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
