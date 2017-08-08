export default pluginContext => (cspaceDocument) => {
  const {
    deepGet,
    getPart,
  } = pluginContext.recordDataHelpers;

  if (!cspaceDocument) {
    return '';
  }

  const common = getPart(cspaceDocument, 'organizations_common');

  if (!common) {
    return '';
  }

  const displayName = deepGet(common, ['orgTermGroupList', 'orgTermGroup', 0, 'termDisplayName']);
  const termStatus = deepGet(common, ['orgTermGroupList', 'orgTermGroup', 0, 'termStatus']);

  return [displayName, termStatus].filter(part => !!part).join(' – ');
};
