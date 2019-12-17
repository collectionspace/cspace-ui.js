export default (configContext) => (data) => {
  const {
    getPart,
  } = configContext.recordDataHelpers;

  const {
    getDisplayName,
  } = configContext.refNameHelpers;

  const {
    formatDate,
  } = configContext.formatHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'movements_common');

  if (!common) {
    return '';
  }

  const currentLocation = getDisplayName(common.get('currentLocation'));
  const locationDate = formatDate(common.get('locationDate'));

  return [currentLocation, locationDate].filter((part) => !!part).join(' – ');
};
