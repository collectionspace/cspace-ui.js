export default pluginContext => (data) => {
  const {
    deepGet,
    getPart,
  } = pluginContext.recordDataHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'places_common');

  if (!common) {
    return '';
  }

  const displayName = deepGet(common, ['placeTermGroupList', 'placeTermGroup', 0, 'termDisplayName']);

  return displayName;
};
