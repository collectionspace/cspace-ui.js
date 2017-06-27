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

  const common = getPart(cspaceDocument, 'acquisitions_common');

  if (!common) {
    return '';
  }

  const acquisitionReferenceNumber = common.get('acquisitionReferenceNumber');
  const acquisitionSource = getDisplayName(deepGet(common, ['acquisitionSources', 'acquisitionSource', 0]));

  return [acquisitionReferenceNumber, acquisitionSource].filter(part => !!part).join(' – ');
};
