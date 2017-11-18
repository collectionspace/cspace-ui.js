export default pluginContext => (data) => {
  const {
    getPart,
  } = pluginContext.recordDataHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'valuationcontrols_common');

  if (!common) {
    return '';
  }

  const valuationcontrolReferenceNumber = common.get('valuationcontrolRefNumber');
  const valueType = common.get('valueType');

  return [valuationcontrolReferenceNumber, valueType].filter(part => !!part).join(' – ');
};
