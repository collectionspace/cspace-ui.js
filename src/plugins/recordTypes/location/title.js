export default pluginContext => (data) => {
  const {
    deepGet,
    getPart,
  } = pluginContext.recordDataHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'locations_common');

  if (!common) {
    return '';
  }

  const displayName = deepGet(common, ['locTermGroupList', 'locTermGroup', 0, 'termDisplayName']);

  return displayName;
};
