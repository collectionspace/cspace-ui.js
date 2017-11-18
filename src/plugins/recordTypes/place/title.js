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
  const termStatus = deepGet(common, ['placeTermGroupList', 'placeTermGroup', 0, 'termStatus']);

  return [displayName, termStatus].filter(part => !!part).join(' – ');
};
