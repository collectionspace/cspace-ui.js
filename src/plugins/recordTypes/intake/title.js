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

  const common = getPart(cspaceDocument, 'intakes_common');

  if (!common) {
    return '';
  }

  const entryNumber = common.get('entryNumber');
  const currentOwner = getDisplayName(common.get('currentOwner'));

  return [entryNumber, currentOwner].filter(part => !!part).join(' – ');
};
