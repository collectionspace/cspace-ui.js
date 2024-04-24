export default (configContext) => (data) => {
  const {
    getPart,
  } = configContext.recordDataHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'nagpraclaims_common');

  if (!common) {
    return '';
  }
  const claimNumber = common.get('claimNumber');
  const title = common.get('title');
  return [claimNumber, title].filter((part) => !!part).join(' – ');
};
