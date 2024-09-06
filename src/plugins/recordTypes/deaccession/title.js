export default (configContext) => (data) => {
  const {
    getPart,
  } = configContext.recordDataHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'deaccession_common');

  if (!common) {
    return '';
  }

  // do we want a second field to be used for the title?
  const referenceNumber = common.get('deaccessionNumber');

  return [referenceNumber].filter((part) => !!part).join(' – ');
};
