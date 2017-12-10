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

  const common = getPart(data, 'pottags_common');

  if (!common) {
    return '';
  }

  const commonName = common.get('commonName');
  const family = getDisplayName(common.get('family'));

  return [commonName, family].filter(part => !!part).join(' – ');
};
