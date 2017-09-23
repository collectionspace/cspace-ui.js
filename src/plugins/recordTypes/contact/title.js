export default pluginContext => (cspaceDocument) => {
  const {
    deepGet,
    getPart,
  } = pluginContext.recordDataHelpers;

  if (!cspaceDocument) {
    return '';
  }

  const common = getPart(cspaceDocument, 'contacts_common');

  if (!common) {
    return '';
  }

  return deepGet(common, ['emailGroupList', 'emailGroup', 0, 'email']);
};
