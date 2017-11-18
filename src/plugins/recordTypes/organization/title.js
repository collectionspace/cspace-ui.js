export default pluginContext => (data) => {
  const {
    deepGet,
    getPart,
  } = pluginContext.recordDataHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'organizations_common');

  if (!common) {
    return '';
  }

  const displayName = deepGet(common, ['orgTermGroupList', 'orgTermGroup', 0, 'termDisplayName']);
  const termStatus = deepGet(common, ['orgTermGroupList', 'orgTermGroup', 0, 'termStatus']);

  return [displayName, termStatus].filter(part => !!part).join(' – ');
};
