export default (configContext) => (data) => {
  const {
    deepGet,
    getPart,
  } = configContext.recordDataHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'citations_common');

  if (!common) {
    return '';
  }

  const displayName = deepGet(common, ['citationTermGroupList', 'citationTermGroup', 0, 'termDisplayName']);

  return displayName;
};
