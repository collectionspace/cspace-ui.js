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

  const common = getPart(cspaceDocument, 'objectexit_common');

  if (!common) {
    return '';
  }

  const exitNumber = common.get('exitNumber');
  const currentOwner = getDisplayName(common.get('currentOwner'));

  return [exitNumber, currentOwner].filter(part => !!part).join(' – ');
};
