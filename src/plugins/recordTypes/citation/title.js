export default pluginContext => (data) => {
  const {
    deepGet,
    getPart,
  } = pluginContext.recordDataHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'citations_common');

  if (!common) {
    return '';
  }

  const displayName = deepGet(common, ['citationTermGroupList', 'citationTermGroup', 0, 'termDisplayName']);
  const termStatus = deepGet(common, ['citationTermGroupList', 'citationTermGroup', 0, 'termStatus']);

  return [displayName, termStatus].filter(part => !!part).join(' – ');
};
