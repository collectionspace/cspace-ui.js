export default pluginContext => (data) => {
  const {
    getPart,
  } = pluginContext.recordDataHelpers;

  const {
    getDisplayName,
  } = pluginContext.refNameHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'loansout_common');

  if (!common) {
    return '';
  }

  const loanOutNumber = common.get('loanOutNumber');
  const borrower = getDisplayName(common.get('borrower'));

  return [loanOutNumber, borrower].filter(part => !!part).join(' – ');
};
