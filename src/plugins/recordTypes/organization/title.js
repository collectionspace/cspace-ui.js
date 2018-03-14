export default configContext => (data) => {
  const {
    deepGet,
    getPart,
  } = configContext.recordDataHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'organizations_common');

  if (!common) {
    return '';
  }

  const displayName = deepGet(common, ['orgTermGroupList', 'orgTermGroup', 0, 'termDisplayName']);

  return displayName;
};
