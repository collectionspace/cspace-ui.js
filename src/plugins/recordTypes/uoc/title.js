export default configContext => (data) => {
  const {
    getPart,
  } = configContext.recordDataHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'uoc_common');

  if (!common) {
    return '';
  }

  const referenceNumber = common.get('referenceNumber');
  const title = common.get('title');

  return [referenceNumber, title].filter(part => !!part).join(' – ');
};
