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

  const common = getPart(data, 'hits_common');

  if (!common) {
    return '';
  }

  const hitNumber = common.get('hitNumber');
  const depositor = getDisplayName(deepGet(common, ['hitDepositorGroupList', 'hitDepositorGroup', 0, 'depositor']));

  return [hitNumber, depositor].filter((part) => !!part).join(' – ');
};
