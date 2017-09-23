export default pluginContext => (cspaceDocument) => {
  const {
    getPart,
  } = pluginContext.recordDataHelpers;

  if (!cspaceDocument) {
    return '';
  }

  const common = getPart(cspaceDocument, 'blobs_common');

  if (!common) {
    return '';
  }

  return common.get('name');
};
