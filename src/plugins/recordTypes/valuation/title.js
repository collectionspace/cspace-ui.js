import { formatOption } from '../../../helpers/formatHelpers';

export default configContext => (data, formatterContext) => {
  const {
    getPart,
  } = configContext.recordDataHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'valuationcontrols_common');

  if (!common) {
    return '';
  }

  const valuationcontrolReferenceNumber = common.get('valuationcontrolRefNumber');
  const valueType = common.get('valueType');
  const formattedValueType = formatOption('valueTypes', valueType, formatterContext);

  return [valuationcontrolReferenceNumber, formattedValueType].filter(part => !!part).join(' – ');
};
