export default (configContext) => (data) => {
  // Given record data, return the name that can be used to look up configuration (including, for
  // example, forms for entering parameters).

  // For reports, use the report filename without extension, since reports that only differ by
  // output type will generally share the same configuration.

  const {
    getPart,
  } = configContext.recordDataHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'reports_common');
  const filename = common && common.get('filename');

  let name = filename;

  if (filename) {
    const dotIndex = filename.lastIndexOf('.');

    if (dotIndex >= 0) {
      name = filename.substring(0, dotIndex);
    }
  }

  return name;
};
