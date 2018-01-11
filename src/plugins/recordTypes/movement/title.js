export default pluginContext => (data) => {
  const {
    getPart,
  } = pluginContext.recordDataHelpers;

  const {
    getDisplayName,
  } = pluginContext.refNameHelpers;

  const {
    formatDate,
  } = pluginContext.formatHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'movements_common');

  if (!common) {
    return '';
  }

  const currentLocation = getDisplayName(common.get('currentLocation'));
  const locationDate = formatDate(common.get('locationDate'));

  return [currentLocation, locationDate].filter(part => !!part).join(' – ');
};
