export default pluginContext => (cspaceDocument) => {
  const {
    deepGet,
    getPart,
  } = pluginContext.recordDataHelpers;

  if (!cspaceDocument) {
    return '';
  }

  const common = getPart(cspaceDocument, 'works_common');

  if (!common) {
    return '';
  }

  const displayName = deepGet(common, ['workTermGroupList', 'workTermGroup', 0, 'termDisplayName']);
  const termStatus = deepGet(common, ['workTermGroupList', 'workTermGroup', 0, 'termStatus']);

  return [displayName, termStatus].filter(part => !!part).join(' – ');
};
