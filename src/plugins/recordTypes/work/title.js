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
  const termStatus = deepGet(common, ['workTermGroupList', 'workTermGroup', 0, 'termStatus']);

  return [displayName, termStatus].filter(part => !!part).join(' – ');
};
