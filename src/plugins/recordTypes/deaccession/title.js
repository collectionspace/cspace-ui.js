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

  const common = getPart(data, 'deaccessions_common');

  if (!common) {
    return '';
  }

  // do we want a second field to be used for the title?
  const referenceNumber = common.get('deaccessionNumber');
  const approvalIndividual = getDisplayName(deepGet(common, ['deaccessionApprovalGroupList', 'deaccessionApprovalGroup', 0, 'deaccessionApprovalIndividual']));

  return [referenceNumber, approvalIndividual].filter((part) => !!part).join(' – ');
};
