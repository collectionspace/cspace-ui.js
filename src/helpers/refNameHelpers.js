import { getServicePath, getVocabularyShortID, getItemShortID } from 'cspace-refname';
import { getRecordTypeConfigByServicePath, getVocabularyConfigByShortID } from './configHelpers';

export const refNameToUrl = (config, refName) => {
  if (!refName) return null;

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

export const refNameToCsid = (config, refName) => {
  if (!refName) return null;

  const itemShortID = getItemShortID(refName);

  return `urn:cspace:name(${itemShortID})`;
};

export const refNameToRecordType = (config, refName) => {
  if (!refName) return null;
  const servicePath = getServicePath(refName);
  const recordTypeConfig = getRecordTypeConfigByServicePath(config, servicePath);

  return recordTypeConfig.name;
};

export const refNameToVocabType = (config, refName) => {
  if (!refName) return null;

  const servicePath = getServicePath(refName);
  const recordTypeConfig = getRecordTypeConfigByServicePath(config, servicePath);
  const vocabularyShortID = getVocabularyShortID(refName);
  const vocabularyConfig = getVocabularyConfigByShortID(recordTypeConfig, vocabularyShortID);

  return vocabularyConfig.name;
};
