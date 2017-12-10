export default pluginContext => (data) => {
  const {
    getPart,
    deepGet,
  } = pluginContext.recordDataHelpers;

  const {
    getDisplayName,
  } = pluginContext.refNameHelpers;

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
