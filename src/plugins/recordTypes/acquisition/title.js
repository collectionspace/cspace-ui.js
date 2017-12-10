export default pluginContext => (data) => {
  const {
    getPart,
    deepGet,
  } = pluginContext.recordDataHelpers;

  const {
    getDisplayName,
  } = pluginContext.refNameHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'acquisitions_common');

  if (!common) {
    return '';
  }

  const acquisitionReferenceNumber = common.get('acquisitionReferenceNumber');
  const acquisitionSource = getDisplayName(deepGet(common, ['acquisitionSources', 'acquisitionSource', 0]));

  return [acquisitionReferenceNumber, acquisitionSource].filter(part => !!part).join(' – ');
};
