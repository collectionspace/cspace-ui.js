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

  const common = getPart(data, 'consultations_common');

  if (!common) {
    return '';
  }

  const consultationNumber = common.get('consultationNumber');
  const involvedParty = getDisplayName(deepGet(common, ['partiesInvolvedGroupList', 'partiesInvolvedGroup', 0, 'involvedParty']));

  return [consultationNumber, involvedParty].filter((part) => !!part).join(' – ');
};
