import { getServicePath, getVocabularyShortID, getItemShortID, getCsid } from 'cspace-refname';
import { getRecordTypeConfigByServicePath, getVocabularyConfigByShortID } from './configHelpers';

export const refNameToCsid = (refName) => {
  if (!refName) {
    return null;
  }

  const itemShortID = getItemShortID(refName);

  if (itemShortID) {
    return `urn:cspace:name(${itemShortID})`;
  }

  const csid = getCsid(refName);

  return (csid || null);
};

export const getRecordType = (config, refName) => {
  if (!refName) {
    return null;
  }

  const servicePath = getServicePath(refName);
  const recordTypeConfig = getRecordTypeConfigByServicePath(config, servicePath);

  return (recordTypeConfig ? recordTypeConfig.name : null);
};

export const getVocabulary = (config, refName) => {
  if (!refName) {
    return null;
  }

  const servicePath = getServicePath(refName);
  const recordTypeConfig = getRecordTypeConfigByServicePath(config, servicePath);

  const vocabularyShortID = getVocabularyShortID(refName);
  const vocabularyConfig = getVocabularyConfigByShortID(recordTypeConfig, vocabularyShortID);

  return vocabularyConfig ? vocabularyConfig.name : null;
};

export const refNameToUrl = (config, refName) => {
  if (!refName) {
    return null;
  }

  const servicePath = getServicePath(refName);
  const recordTypeConfig = getRecordTypeConfigByServicePath(config, servicePath);
  const recordType = recordTypeConfig.name;

  const vocabularyShortID = getVocabularyShortID(refName);
  const vocabularyConfig = getVocabularyConfigByShortID(recordTypeConfig, vocabularyShortID);
  const vocabulary = vocabularyConfig.name;

  const itemShortID = getItemShortID(refName);
  const csid = `urn:cspace:name(${itemShortID})`;

  return `/record/${recordType}/${vocabulary}/${csid}`;
};
