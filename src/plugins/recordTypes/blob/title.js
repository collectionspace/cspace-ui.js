export default pluginContext => (data) => {
  const {
    getPart,
  } = pluginContext.recordDataHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'blobs_common');

  if (!common) {
    return '';
  }

  return common.get('name');
};
