export default (configContext) => (data) => {
  const {
    deepGet,
    getPart,
  } = configContext.recordDataHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'summarydocumentations_common');

  if (!common) {
    return '';
  }

  const referenceNumber = common.get('documentationNumber');
  const title = deepGet(common, ['titles', 'title', '0']);

  return [referenceNumber, title].filter((part) => !!part).join(' – ');
};
