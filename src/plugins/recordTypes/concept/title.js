export default pluginContext => (data) => {
  const {
    deepGet,
    getPart,
  } = pluginContext.recordDataHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'concepts_common');

  if (!common) {
    return '';
  }

  const displayName = deepGet(common, ['conceptTermGroupList', 'conceptTermGroup', 0, 'termDisplayName']);

  return displayName;
};
