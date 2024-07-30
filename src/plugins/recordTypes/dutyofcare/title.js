export default (configContext) => (data) => {
  const {
    getPart,
  } = configContext.recordDataHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'dutiesofcare_common');

  if (!common) {
    return '';
  }

  const referenceNumber = common.get('dutyOfCareNumber');
  const dutyOfCareTitle = common.get('dutyOfCareTitle');

  return [referenceNumber, dutyOfCareTitle].filter((part) => !!part).join(' – ');
};
