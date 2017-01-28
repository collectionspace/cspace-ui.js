import { getServicePath, getVocabularyShortID } from 'cspace-refname';

import {
  getRecordTypeConfigByServiceObjectName,
  getRecordTypeConfigByServicePath,
  getVocabularyConfigByShortID,
} from './configHelpers';

export const formatTimestamp = (timestamp, { intl }) =>
  intl.formatDate(timestamp, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    // timeZoneName: 'short',
  });

export const formatServiceObjectName = (serviceObjectName, { intl, config }) => {
  const recordTypeConfig = getRecordTypeConfigByServiceObjectName(config, serviceObjectName);

  if (recordTypeConfig) {
    return intl.formatMessage(recordTypeConfig.messages.record.name);
  }

  return `[ ${serviceObjectName.toLowerCase()} ]`;
};

export const formatRefNameAsRecordType = (refName, { intl, config }) => {
  const recordServicePath = getServicePath(refName);
  const recordTypeConfig = getRecordTypeConfigByServicePath(config, recordServicePath);

  if (recordTypeConfig) {
    return intl.formatMessage(recordTypeConfig.messages.record.name);
  }

  return `[ ${recordServicePath.toLowerCase()} ]`;
};

export const formatRefNameAsVocabularyName = (refName, { intl, config }) => {
  const recordServicePath = getServicePath(refName);
  const recordTypeConfig = getRecordTypeConfigByServicePath(config, recordServicePath);

  if (recordTypeConfig) {
    const vocabularyShortID = getVocabularyShortID(refName);
    const vocabularyConfig = getVocabularyConfigByShortID(recordTypeConfig, vocabularyShortID);

    if (vocabularyConfig) {
      return intl.formatMessage(vocabularyConfig.messages.name);
    }

    return `[ ${vocabularyShortID.toLowerCase()} ]`;
  }

  return `[ ${recordServicePath.toLowerCase()} ]`;
};

export const formatSourceField = (sourceField, { intl, config, recordType }) => {
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
