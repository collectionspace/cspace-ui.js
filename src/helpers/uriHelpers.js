import {
  getRecordTypeConfigByServicePath,
  getVocabularyConfigByServicePath,
} from './configHelpers';

const uriPattern = /\/cspace-services\/(.*?)\/(.*?)(\/items\/(.*?))?$/;

export const serviceUriToLocation = (config, uri) => {
  if (!uri) {
    return undefined;
  }

  const match = uriPattern.exec(uri);

  if (!match) {
    return undefined;
  }

  const servicePath = match[1];

  let csid;
  let vocabularyServicePath;

  if (match[3]) {
    csid = match[4];
    vocabularyServicePath = match[2];
  } else {
    csid = match[2];
  }

  const recordTypeConfig = getRecordTypeConfigByServicePath(config, servicePath);

  if (!recordTypeConfig) {
    return undefined;
  }

  const recordType = recordTypeConfig.name;
  const parts = ['/record', recordType];

  if (vocabularyServicePath) {
    const vocabularyConfig =
      getVocabularyConfigByServicePath(recordTypeConfig, vocabularyServicePath);

    const vocabulary = vocabularyConfig ? vocabularyConfig.name : undefined;

    if (!vocabulary) {
      return undefined;
    }

    parts.push(vocabulary);
  }

  parts.push(csid);

  return {
    pathname: parts.join('/'),
  };
};

export default {};
