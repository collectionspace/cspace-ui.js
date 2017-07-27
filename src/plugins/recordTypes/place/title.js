export default pluginContext => (cspaceDocument) => {
  const {
    deepGet,
    getPart,
  } = pluginContext.recordDataHelpers;

  if (!cspaceDocument) {
    return '';
  }

  const common = getPart(cspaceDocument, 'places_common');

  if (!common) {
    return '';
  }

  const displayName = deepGet(common, ['placeTermGroupList', 'placeTermGroup', 0, 'termDisplayName']);
  const termStatus = deepGet(common, ['placeTermGroupList', 'placeTermGroup', 0, 'termStatus']);

  return [displayName, termStatus].filter(part => !!part).join(' – ');
};
