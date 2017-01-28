import { defineMessages } from 'react-intl';

import {
  formatRefNameAsRecordType,
  formatRefNameAsVocabularyName,
  formatSourceField,
} from '../../../helpers/formatHelpers';

export default {
  default: [
    {
      name: 'itemDisplayName',
      messages: defineMessages({
        label: {
          id: 'column.terms.itemDisplayName',
          defaultMessage: 'Term',
        },
      }),
      width: 250,
    },
    {
      name: 'type',
      dataKey: 'refName',
      messages: defineMessages({
        label: {
          id: 'column.terms.type',
          defaultMessage: 'Type',
        },
      }),
      formatValue: (value, formatterContext) =>
        formatRefNameAsRecordType(value, formatterContext),
      width: 150,
    },
    {
      name: 'vocabulary',
      dataKey: 'refName',
      messages: defineMessages({
        label: {
          id: 'column.terms.vocabulary',
          defaultMessage: 'Vocabulary',
        },
      }),
      formatValue: (value, formatterContext) =>
        formatRefNameAsVocabularyName(value, formatterContext),
      width: 150,
    },
    {
      name: 'sourceField',
      messages: defineMessages({
        label: {
          id: 'column.terms.sourceField',
          defaultMessage: 'Field',
        },
      }),
      formatValue: (value, formatterContext) =>
        formatSourceField(value, formatterContext),
      width: 250,
    },
  ],
  narrow: [
    {
      name: 'itemDisplayName',
      messages: defineMessages({
        label: {
          id: 'column.terms.itemDisplayName',
          defaultMessage: 'Term',
        },
      }),
      width: 250,
    },
    {
      name: 'type',
      dataKey: 'refName',
      messages: defineMessages({
        label: {
          id: 'column.terms.type',
          defaultMessage: 'Type',
        },
      }),
      formatValue: (value, formatterContext) =>
        formatRefNameAsRecordType(value, formatterContext),
      width: 150,
    },
    {
      name: 'vocabulary',
      dataKey: 'refName',
      messages: defineMessages({
        label: {
          id: 'column.terms.vocabulary',
          defaultMessage: 'Vocabulary',
        },
      }),
      formatValue: (value, formatterContext) =>
        formatRefNameAsVocabularyName(value, formatterContext),
      width: 150,
    },
    {
      name: 'sourceField',
      messages: defineMessages({
        label: {
          id: 'column.terms.sourceField',
          defaultMessage: 'Field',
        },
      }),
      formatValue: (value, formatterContext) =>
        formatSourceField(value, formatterContext),
      width: 250,
    },
  ],
};
