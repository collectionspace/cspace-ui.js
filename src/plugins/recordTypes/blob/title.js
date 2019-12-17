export default (configContext) => (data) => {
  const {
    getPart,
  } = configContext.recordDataHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'blobs_common');

  if (!common) {
    return '';
  }

  return common.get('name');
};
