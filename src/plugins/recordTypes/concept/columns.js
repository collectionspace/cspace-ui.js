import { defineMessages } from 'react-intl';

import {
  formatRefNameAsVocabularyName,
  formatTimestamp,
} from '../../../helpers/formatHelpers';

export default {
  default: [
    {
      name: 'termDisplayName',
      messages: defineMessages({
        label: {
          id: 'column.concept.default.termDisplayName',
          defaultMessage: 'Display name',
        },
      }),
      sortBy: 'concepts_common:conceptTermGroupList/0/termDisplayName',
      width: 250,
    },
    {
      name: 'termStatus',
      messages: defineMessages({
        label: {
          id: 'column.concept.default.termStatus',
          defaultMessage: 'Term status',
        },
      }),
      sortBy: 'concepts_common:conceptTermGroupList/0/termStatus',
      width: 250,
    },
    {
      name: 'vocabulary',
      dataKey: 'refName',
      messages: defineMessages({
        label: {
          id: 'column.concept.default.vocabulary',
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
          id: 'column.concept.search.updatedAt',
          defaultMessage: 'Updated',
        },
      }),
      formatValue: formatTimestamp,
      sortBy: 'collectionspace_core:updatedAt',
      width: 150,
    },
  ],
};
