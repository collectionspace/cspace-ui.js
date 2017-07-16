export default pluginContext => (cspaceDocument) => {
  const {
    getPart,
    deepGet,
  } = pluginContext.recordDataHelpers;

  if (!cspaceDocument) {
    return '';
  }

  const common = getPart(cspaceDocument, 'conditionchecks_common');

  if (!common) {
    return '';
  }

  const conditioncheckRefNumber = common.get('conditionCheckRefNumber');
  const condition = deepGet(common, ['conditionCheckGroupList', 'conditionCheckGroup', 0, 'condition']);

  return [conditioncheckRefNumber, condition].filter(part => !!part).join(' – ');
};
