export default pluginContext => (cspaceDocument) => {
  const {
    getPart,
  } = pluginContext.recordDataHelpers;


  if (!cspaceDocument) {
    return '';
  }

  const common = getPart(cspaceDocument, 'exhibitions_common');

  if (!common) {
    return '';
  }

  const exhibitionNumber = common.get('exhibitionNumber');
  const title = common.get('title');

  return [exhibitionNumber, title].filter(part => !!part).join(' – ');
};
