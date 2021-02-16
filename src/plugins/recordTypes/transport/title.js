export default (configContext) => (data) => {
  const {
    getPart,
  } = configContext.recordDataHelpers;

  const {
    getDisplayName,
  } = configContext.refNameHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'transports_common');

  if (!common) {
    return '';
  }

  const referenceNumber = common.get('transportReferenceNumber');
  const transporter = getDisplayName(common.get('transporter'));

  return [referenceNumber, transporter].filter((part) => !!part).join(' – ');
};
