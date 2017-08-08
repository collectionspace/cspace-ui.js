export default pluginContext => (cspaceDocument) => {
  const {
    deepGet,
    getPart,
  } = pluginContext.recordDataHelpers;

  if (!cspaceDocument) {
    return '';
  }

  const common = getPart(cspaceDocument, 'taxon_common');

  if (!common) {
    return '';
  }

  const displayName = deepGet(common, ['taxonTermGroupList', 'taxonTermGroup', 0, 'termDisplayName']);
  const termStatus = deepGet(common, ['taxonTermGroupList', 'taxonTermGroup', 0, 'termStatus']);

  return [displayName, termStatus].filter(part => !!part).join(' – ');
};
