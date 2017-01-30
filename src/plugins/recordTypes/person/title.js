export default pluginContext => (cspaceDocument) => {
  const {
    deepGet,
    getPart,
  } = pluginContext.recordDataHelpers;

  if (!cspaceDocument) {
    return '';
  }

  const common = getPart(cspaceDocument, 'persons_common');

  if (!common) {
    return '';
  }

  const displayName =
    deepGet(common, ['personTermGroupList', 'personTermGroup', 0, 'termDisplayName']);

  return displayName;
};
