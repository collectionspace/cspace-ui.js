export default pluginContext => (cspaceDocument) => {
  const {
    getPart,
  } = pluginContext.recordDataHelpers;

  const {
    getDisplayName,
  } = pluginContext.refNameHelpers;

  if (!cspaceDocument) {
    return '';
  }

  const common = getPart(cspaceDocument, 'loansin_common');

  if (!common) {
    return '';
  }

  const loanInNumber = common.get('loanInNumber');
  const borrower = getDisplayName(common.get('borrower'));

  return [loanInNumber, borrower].filter(part => !!part).join(' – ');
};
