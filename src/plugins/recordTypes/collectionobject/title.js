export default pluginContext => (cspaceDocument) => {
  const {
    deepGet,
    getPart,
  } = pluginContext.recordDataHelpers;

  if (!cspaceDocument) {
    return '';
  }

  const common = getPart(cspaceDocument, 'collectionobjects_common');

  if (!common) {
    return '';
  }

  const objectNumber = common.get('objectNumber');
  const title = deepGet(common, ['titleGroupList', 'titleGroup', 0, 'title']);

  return [objectNumber, title].filter(part => !!part).join(' – ');
};
