import React from 'react';
import get from 'lodash/get';
import { getDisplayName, getServicePath, getVocabularyShortID } from 'cspace-refname';
import WorkflowStateIcon from '../components/record/WorkflowStateIcon';

import {
  getRecordTypeConfigByServiceObjectName,
  getRecordTypeConfigByServicePath,
  getVocabularyConfigByShortID,
  findFieldConfigInPart,
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

export const formatDate = (date) => {
  if (!date) {
    return null;
  }

  const index = date.indexOf('T');

  if (index >= 0) {
    return date.substring(0, index);
  }

  return date;
};

export const formatServiceObjectName = (serviceObjectName, { intl, config }) => {
  const recordTypeConfig = getRecordTypeConfigByServiceObjectName(config, serviceObjectName);

  if (recordTypeConfig) {
    return intl.formatMessage(recordTypeConfig.messages.record.name);
  }

  return `[ ${serviceObjectName.toLowerCase()} ]`;
};

export const formatRefName = refName => getDisplayName(refName);

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

    const fallback = vocabularyShortID ? vocabularyShortID.toLowerCase() : '';

    return `[ ${fallback} ]`;
  }

  return `[ ${recordServicePath.toLowerCase()} ]`;
};

export const formatRecordTypeSourceField = (recordType, sourceField, { intl, config }) => {
  const recordTypeConfig = config.recordTypes[recordType];
  const [partName, fieldName] = sourceField.split(':');

  const fieldConfig = findFieldConfigInPart(recordTypeConfig, partName, fieldName);

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

export const formatWorkflowStateIcon = workflowState =>
  <WorkflowStateIcon value={workflowState} />;

export const formatOption = (optionListName, value, { intl, config }) => {
  const message = get(config, ['optionLists', optionListName, 'messages', value]);

  return (message ? intl.formatMessage(message) : value);
};

export const formatExtensionFieldName = (intl, fieldConfig, messageName = 'fullName') => {
  const extensionParentConfig = get(fieldConfig, 'extensionParentConfig');

  const formattedParentName = extensionParentConfig
    ? formatExtensionFieldName(intl, extensionParentConfig, messageName)
    : null;

  const messages = get(fieldConfig, 'messages');

  let formattedName;

  if (messages) {
    formattedName = intl.formatMessage(
      messages[messageName] || messages.fullName || messages.name
    );
  }

  return [formattedParentName, formattedName].filter(part => !!part).join(' - ');
};
