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

  const common = getPart(data, 'objectexit_common');

  if (!common) {
    return '';
  }

  const exitNumber = common.get('exitNumber');
  const currentOwner = getDisplayName(common.get('currentOwner'));

  return [exitNumber, currentOwner].filter(part => !!part).join(' – ');
};
