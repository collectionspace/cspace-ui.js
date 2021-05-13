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

  const common = getPart(data, 'insurances_common');

  if (!common) {
    return '';
  }

  const referenceNumber = common.get('insuranceIndemnityReferenceNumber');
  const insurerIndemnifier = getDisplayName(common.get('insurerIndemnifier'));

  return [referenceNumber, insurerIndemnifier].filter((part) => !!part).join(' – ');
};
