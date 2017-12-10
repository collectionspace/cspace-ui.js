export default pluginContext => (data) => {
  const {
    deepGet,
    getPart,
  } = pluginContext.recordDataHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'persons_common');

  if (!common) {
    return '';
  }

  const displayName =
    deepGet(common, ['personTermGroupList', 'personTermGroup', 0, 'termDisplayName']);

  return displayName;
};
