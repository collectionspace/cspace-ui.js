export default pluginContext => (cspaceDocument) => {
  const {
    deepGet,
    getPart,
  } = pluginContext.recordDataHelpers;

  if (!cspaceDocument) {
    return '';
  }

  const common = getPart(cspaceDocument, 'locations_common');

  if (!common) {
    return '';
  }

  const displayName = deepGet(common, ['locTermGroupList', 'locTermGroup', 0, 'termDisplayName']);
  const termStatus = deepGet(common, ['locTermGroupList', 'locTermGroup', 0, 'termStatus']);

  return [displayName, termStatus].filter(part => !!part).join(' – ');
};
