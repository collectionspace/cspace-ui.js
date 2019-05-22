export default configContext => (data) => {
  // Given record data, return the name that can be used to look up configuration (including, for
  // example, forms for entering parameters).

  const {
    getPart,
  } = configContext.recordDataHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'batch_common');

  return common && common.get('name');
};
