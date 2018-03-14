export default configContext => (data) => {
  const {
    getPart,
  } = configContext.recordDataHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'media_common');

  if (!common) {
    return '';
  }

  const identificationNumber = common.get('identificationNumber');
  const title = common.get('title');

  return [identificationNumber, title].filter(part => !!part).join(' – ');
};
