export default (configContext) => (data) => {
  const {
    getPart,
  } = configContext.recordDataHelpers;

  const {
    getDisplayName,
  } = configContext.refNameHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'groups_common');

  if (!common) {
    return '';
  }

  const title = common.get('title');
  const owner = getDisplayName(common.get('owner'));

  return [title, owner].filter((part) => !!part).join(' – ');
};
