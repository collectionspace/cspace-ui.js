export default pluginContext => (cspaceDocument) => {
  const {
    deepGet,
    getPart,
  } = pluginContext.recordDataHelpers;

  if (!cspaceDocument) {
    return '';
  }

  const common = getPart(cspaceDocument, 'citations_common');

  if (!common) {
    return '';
  }

  const displayName = deepGet(common, ['citationTermGroupList', 'citationTermGroup', 0, 'termDisplayName']);
  const termStatus = deepGet(common, ['citationTermGroupList', 'citationTermGroup', 0, 'termStatus']);

  return [displayName, termStatus].filter(part => !!part).join(' – ');
};
