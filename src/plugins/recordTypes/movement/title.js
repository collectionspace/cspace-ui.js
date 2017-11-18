const normalizeDate = (date) => {
  if (!date) {
    return null;
  }

  const index = date.indexOf('T');

  if (index >= 0) {
    return date.substring(0, index);
  }

  return date;
};

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

  const common = getPart(data, 'movements_common');

  if (!common) {
    return '';
  }

  const currentLocation = getDisplayName(common.get('currentLocation'));
  const locationDate = normalizeDate(common.get('locationDate'));

  return [currentLocation, locationDate].filter(part => !!part).join(' – ');
};
