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

  const common = getPart(data, 'loansout_common');

  if (!common) {
    return '';
  }

  const loanOutNumber = common.get('loanOutNumber');
  const borrower = getDisplayName(common.get('borrower'));

  return [loanOutNumber, borrower].filter((part) => !!part).join(' – ');
};
