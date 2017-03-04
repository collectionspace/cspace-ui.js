import { getServicePath, getVocabularyShortID } from 'cspace-refname';

import {
  getFieldConfigInPart,
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

export const formatRecordTypeSourceField = (recordType, sourceField, { intl, config }) => {
  const recordTypeConfig = config.recordTypes[recordType];
  const [partName, fieldName] = sourceField.split(':');

  const fieldConfig = getFieldConfigInPart(recordTypeConfig, partName, fieldName);

  let message;

  if (fieldConfig) {
    const messages = fieldConfig.messages;

    if (messages) {
      message = messages.fullName || messages.name;
    }
  }

  return (message ? intl.formatMessage(message) : `[ ${fieldName} ]`);
};

export const formatSourceField = (sourceField, formatterContext) =>
  formatRecordTypeSourceField(formatterContext.recordType, sourceField, formatterContext);

export const formatForeignSourceField = (sourceField, formatterContext) => {
  const {
    config,
    rowData,
  } = formatterContext;

  const serviceObjectName = rowData.get('docType');
  const recordTypeConfig = getRecordTypeConfigByServiceObjectName(config, serviceObjectName);
  const recordType = recordTypeConfig ? recordTypeConfig.name : null;

  return formatRecordTypeSourceField(recordType, sourceField, formatterContext);
};
