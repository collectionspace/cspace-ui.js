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

  const common = getPart(data, 'pottags_common');

  if (!common) {
    return '';
  }

  const commonName = common.get('commonName');
  const family = getDisplayName(common.get('family'));

  return [commonName, family].filter((part) => !!part).join(' – ');
};
