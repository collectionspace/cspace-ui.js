export default pluginContext => (data) => {
  const {
    deepGet,
    getPart,
  } = pluginContext.recordDataHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'works_common');

  if (!common) {
    return '';
  }

  const displayName = deepGet(common, ['workTermGroupList', 'workTermGroup', 0, 'termDisplayName']);

  return displayName;
};
