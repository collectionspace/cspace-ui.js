export default pluginContext => (cspaceDocument) => {
  const {
    getPart,
    deepGet,
  } = pluginContext.recordDataHelpers;

  const {
    getDisplayName,
  } = pluginContext.refNameHelpers;

  if (!cspaceDocument) {
    return '';
  }

  const common = getPart(cspaceDocument, 'conservation_common');

  if (!common) {
    return '';
  }

  const conservationNumber = common.get('conservationNumber');
  const status = getDisplayName(deepGet(common, ['conservationStatusGroupList', 'conservationStatusGroup', 0, 'status']));

  return [conservationNumber, status].filter(part => !!part).join(' – ');
};
