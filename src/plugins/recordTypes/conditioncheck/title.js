export default pluginContext => (data) => {
  const {
    getPart,
    deepGet,
  } = pluginContext.recordDataHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'conditionchecks_common');

  if (!common) {
    return '';
  }

  const conditioncheckRefNumber = common.get('conditionCheckRefNumber');
  const condition = deepGet(common, ['conditionCheckGroupList', 'conditionCheckGroup', 0, 'condition']);

  return [conditioncheckRefNumber, condition].filter(part => !!part).join(' – ');
};
