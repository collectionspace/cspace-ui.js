export default (configContext) => (data) => {
  const {
    getPart,
    deepGet,
  } = configContext.recordDataHelpers;

  const {
    getDisplayName,
  } = configContext.refNameHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'conservation_common');

  if (!common) {
    return '';
  }

  const conservationNumber = common.get('conservationNumber');
  const status = getDisplayName(deepGet(common, ['conservationStatusGroupList', 'conservationStatusGroup', 0, 'status']));

  return [conservationNumber, status].filter((part) => !!part).join(' – ');
};
