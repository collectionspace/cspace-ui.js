export default (configContext) => (data) => {
  const {
    deepGet,
    getPart,
  } = configContext.recordDataHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'chronologies_common');

  if (!common) {
    return '';
  }

  const displayName = deepGet(common, ['chronologyTermGroupList', 'chronologyTermGroup', 0, 'termDisplayName']);

  return displayName;
};
