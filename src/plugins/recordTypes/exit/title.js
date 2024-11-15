export default (configContext) => (data) => {
  const {
    deepGet,
    getPart,
  } = configContext.recordDataHelpers;

  const {
    getDisplayName,
  } = configContext.refNameHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'exits_common');

  if (!common) {
    return '';
  }

  const referenceNumber = common.get('exitNumber');
  const owner = getDisplayName(deepGet(common, ['owners', 'owner', 0]));

  return [referenceNumber, owner].filter((part) => !!part).join(' – ');
};
