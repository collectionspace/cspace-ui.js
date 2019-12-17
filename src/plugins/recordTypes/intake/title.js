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

  const common = getPart(data, 'intakes_common');

  if (!common) {
    return '';
  }

  const entryNumber = common.get('entryNumber');
  const currentOwner = getDisplayName(common.get('currentOwner'));

  return [entryNumber, currentOwner].filter((part) => !!part).join(' – ');
};
