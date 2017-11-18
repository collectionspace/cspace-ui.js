export default pluginContext => (data) => {
  const {
    getPart,
  } = pluginContext.recordDataHelpers;

  const {
    getDisplayName,
  } = pluginContext.refNameHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'groups_common');

  if (!common) {
    return '';
  }

  const title = common.get('title');
  const owner = getDisplayName(common.get('owner'));

  return [title, owner].filter(part => !!part).join(' – ');
};
