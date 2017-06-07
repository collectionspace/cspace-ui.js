export default pluginContext => (cspaceDocument) => {
  const {
    getPart,
  } = pluginContext.recordDataHelpers;

  const {
    getDisplayName,
  } = pluginContext.refNameHelpers;

  if (!cspaceDocument) {
    return '';
  }

  const common = getPart(cspaceDocument, 'exhibitions_common');

  if (!common) {
    return '';
  }

  const exhibitionNumber = common.get('exhibitionNumber');
  const title = getDisplayName(common.get('title'));

  return [exhibitionNumber, title].filter(part => !!part).join(' – ');
};
