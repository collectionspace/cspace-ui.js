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

  const common = getPart(data, 'audit_common');

  if (!common) {
    return '';
  }

  const recordId = common.get('recordId');

  return [recordId].filter((part) => !!part).join(' – ');
};