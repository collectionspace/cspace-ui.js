export default pluginContext => (data) => {
  const {
    deepGet,
    getPart,
  } = pluginContext.recordDataHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'taxon_common');

  if (!common) {
    return '';
  }

  const displayName = deepGet(common, ['taxonTermGroupList', 'taxonTermGroup', 0, 'termDisplayName']);
  const termStatus = deepGet(common, ['taxonTermGroupList', 'taxonTermGroup', 0, 'termStatus']);

  return [displayName, termStatus].filter(part => !!part).join(' – ');
};
