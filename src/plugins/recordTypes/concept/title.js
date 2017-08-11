export default pluginContext => (cspaceDocument) => {
  const {
    deepGet,
    getPart,
  } = pluginContext.recordDataHelpers;

  if (!cspaceDocument) {
    return '';
  }

  const common = getPart(cspaceDocument, 'concepts_common');

  if (!common) {
    return '';
  }

  const displayName = deepGet(common, ['conceptTermGroupList', 'conceptTermGroup', 0, 'termDisplayName']);
  const termStatus = deepGet(common, ['conceptTermGroupList', 'conceptTermGroup', 0, 'termStatus']);

  return [displayName, termStatus].filter(part => !!part).join(' – ');
};
