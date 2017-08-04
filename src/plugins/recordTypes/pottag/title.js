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

  const common = getPart(cspaceDocument, 'pottags_common');

  if (!common) {
    return '';
  }

  const commonName = common.get('commonName');
  const family = getDisplayName(common.get('family'));

  return [commonName, family].filter(part => !!part).join(' – ');
};
