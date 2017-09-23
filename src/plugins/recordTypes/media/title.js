export default pluginContext => (cspaceDocument) => {
  const {
    getPart,
  } = pluginContext.recordDataHelpers;

  if (!cspaceDocument) {
    return '';
  }

  const common = getPart(cspaceDocument, 'media_common');

  if (!common) {
    return '';
  }

  const identificationNumber = common.get('identificationNumber');
  const title = common.get('title');

  return [identificationNumber, title].filter(part => !!part).join(' – ');
};
