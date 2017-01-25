import { defineMessages } from 'react-intl';
import { getServicePath, getVocabularyShortID } from 'cspace-refname';

import {
  getRecordTypeConfigByServicePath,
  getVocabularyConfigByShortID,
} from '../../../helpers/configHelpers';

const formatRecordServicePath = (refName, { intl, config }) => {
  const recordServicePath = getServicePath(refName);
  const recordTypeConfig = getRecordTypeConfigByServicePath(config, recordServicePath);

  if (recordTypeConfig) {
    return intl.formatMessage(recordTypeConfig.messages.record.recordNameTitle);
  }

  return `[ ${recordServicePath.toLowerCase()} ]`;
};

const formatVocabularyShortID = (refName, { intl, config }) => {
  const recordServicePath = getServicePath(refName);
  const recordTypeConfig = getRecordTypeConfigByServicePath(config, recordServicePath);

  if (recordTypeConfig) {
    const vocabularyShortID = getVocabularyShortID(refName);
    const vocabularyConfig = getVocabularyConfigByShortID(recordTypeConfig, vocabularyShortID);

    if (vocabularyConfig) {
      return intl.formatMessage(vocabularyConfig.messages.vocabNameTitle);
    }

    return `[ ${vocabularyShortID.toLowerCase()} ]`;
  }

  return `[ ${recordServicePath.toLowerCase()} ]`;
};

const formatSourceField = (sourceField, { intl, config, recordType }) => {
  // FIXME: This should use a full name message, distinct from the label used in the record editor,
  // because the record editor label may not have enough context. This requires refactoring of
  // messages and reworking how record editor fields are labeled.

  // FIXME: This should take the part name into account, since a field name is unique only within a
  // part. This requires refactoring of messages.

  const fieldName = sourceField.split(':')[1]; // partName:fieldName
  const recordTypeConfig = config.recordTypes[recordType];
  const message = recordTypeConfig.messages.field[fieldName];

  if (message) {
    return intl.formatMessage(message);
  }

  return `[ ${fieldName} ]`;
};

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
        formatRecordServicePath(value, formatterContext),
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
        formatVocabularyShortID(value, formatterContext),
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
        formatRecordServicePath(value, formatterContext),
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
        formatVocabularyShortID(value, formatterContext),
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
