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

  const common = getPart(cspaceDocument, 'loansout_common');

  if (!common) {
    return '';
  }

  const loanOutNumber = common.get('loanOutNumber');
  const borrower = getDisplayName(common.get('borrower'));

  return [loanOutNumber, borrower].filter(part => !!part).join(' – ');
};
