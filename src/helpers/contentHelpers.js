import get from 'lodash/get';

export const getContentPath = (config, recordType, vocabulary, csid, subresource, recordData) => {
  if (!csid) {
    return null;
  }

  const subresourceName = (typeof subresource === 'function')
    ? subresource(recordData)
    : subresource;

  const recordTypeConfig = get(config, ['recordTypes', recordType]);
  const vocabularyConfig = get(recordTypeConfig, ['vocabularies', vocabulary]);
  const subresourceConfig = get(config, ['subresources', subresourceName]);

  const recordServicePath = get(recordTypeConfig, ['serviceConfig', 'servicePath']);
  const vocabularyServicePath = get(vocabularyConfig, ['serviceConfig', 'servicePath']);

  const pathParts = [recordServicePath];

  if (vocabularyServicePath) {
    pathParts.push(vocabularyServicePath);
    pathParts.push('items');
  }

  pathParts.push(csid);

  if (subresourceConfig) {
    const subresourceServicePath = get(subresourceConfig, ['serviceConfig', 'servicePath']);

    if (subresourceServicePath) {
      pathParts.push(subresourceServicePath);
    }
  }

  pathParts.push('content');

  return pathParts.join('/');
};

export default {};
