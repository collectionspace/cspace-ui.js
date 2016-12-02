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

  const common = getPart(cspaceDocument, 'groups_common');

  if (!common) {
    return '';
  }

  const title = common.get('title');
  const owner = getDisplayName(common.get('owner'));

  return [title, owner].filter(part => !!part).join(' – ');
};
