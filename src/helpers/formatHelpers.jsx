import React from 'react';
import get from 'lodash/get';
import { getDisplayName, getServicePath, getVocabularyShortID } from 'cspace-refname';
import BlobImage from '../components/media/BlobImage';
import WorkflowStateIcon from '../components/record/WorkflowStateIcon';

import {
  DERIVATIVE_THUMBNAIL,
  DERIVATIVE_SMALL,
  DERIVATIVE_MEDIUM,
  DERIVATIVE_ORIGINAL_JPEG,
  DERIVATIVE_ORIGINAL,
} from '../constants/derivativeNames';

import {
  getRecordTypeConfigByServiceObjectName,
  getRecordTypeConfigByServicePath,
  getVocabularyConfigByShortID,
  findFieldConfigInPart,
} from './configHelpers';

export const formatTimestamp = (timestamp, { intl }) => intl.formatDate(timestamp, {
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

export const formatNameRole = (name, role) => {
  if (name && role) {
    return `${name} (${role})`;
  }

  return name;
};

export const formatServiceObjectName = (serviceObjectName, { intl, config }) => {
  const recordTypeConfig = getRecordTypeConfigByServiceObjectName(config, serviceObjectName);

  if (recordTypeConfig) {
    return intl.formatMessage(recordTypeConfig.messages.record.name);
  }

  return `[ ${serviceObjectName.toLowerCase()} ]`;
};

export const formatRefName = (refName) => getDisplayName(refName);

/**
 * Attempt to format a RefName. If it cannot be formatted, return the initial value.
 * @param {string} maybeRef a string which could be a refname
 * @returns the formatted value of maybeRef or the initial value maybeRef
 */
export const formatRefNameWithDefault = (maybeRef) => formatRefName(maybeRef) || maybeRef;

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
    const { messages } = fieldConfig;

    if (messages) {
      message = messages.fullName || messages.name;
    }
  }

  return (message ? intl.formatMessage(message) : `[ ${fieldName} ]`);
};

export const formatSourceField = (sourceField, formatterContext) => (
  formatRecordTypeSourceField(formatterContext.recordType, sourceField, formatterContext)
);

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

export const formatWorkflowStateIcon = (workflowState) => (
  <WorkflowStateIcon value={workflowState} />
);

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
      messages[messageName] || messages.fullName || messages.name,
    );
  }

  return [formattedParentName, formattedName].filter((part) => !!part).join(' - ');
};

export const derivativeImage = (blobCsid, derivative, rowData) => {
  if (!blobCsid || !rowData) {
    return null;
  }

  const alt = rowData.get('altText') || rowData.get('identificationNumber');
  return <BlobImage csid={blobCsid} derivative={derivative} alt={alt} />;
};

export const thumbnailImage = (blobCsid, { rowData } = {}) => derivativeImage(
  blobCsid,
  DERIVATIVE_THUMBNAIL,
  rowData,
);

export const smallImage = (blobCsid, { rowData } = {}) => derivativeImage(
  blobCsid,
  DERIVATIVE_SMALL,
  rowData,
);

export const mediumImage = (blobCsid, { rowData } = {}) => derivativeImage(
  blobCsid,
  DERIVATIVE_MEDIUM,
  rowData,
);

export const originalJpegImage = (blobCsid, { rowData } = {}) => derivativeImage(
  blobCsid,
  DERIVATIVE_ORIGINAL_JPEG,
  rowData,
);

export const originalImage = (blobCsid, { rowData } = {}) => derivativeImage(
  blobCsid,
  DERIVATIVE_ORIGINAL,
  rowData,
);
