export default configContext => (data) => {
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

  const common = getPart(data, 'loansin_common');

  if (!common) {
    return '';
  }

  const loanInNumber = common.get('loanInNumber');
  const borrower = getDisplayName(deepGet(common, ['lenderGroupList', 'lenderGroup', 0, 'lender']));

  return [loanInNumber, borrower].filter(part => !!part).join(' – ');
};
