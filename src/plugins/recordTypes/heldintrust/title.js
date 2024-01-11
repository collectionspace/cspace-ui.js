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

  const common = getPart(data, 'heldintrusts_common');

  if (!common) {
    return '';
  }

  const hitNumber = common.get('heldInTrustNumber');
  const depositor = getDisplayName(deepGet(common, ['heldInTrustDepositorGroupList', 'heldInTrustDepositorGroup', 0, 'depositor']));

  return [hitNumber, depositor].filter((part) => !!part).join(' – ');
};
