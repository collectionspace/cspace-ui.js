export default (configContext) => (data) => {
  const {
    getPart,
  } = configContext.recordDataHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'hits_common');

  if (!common) {
    return '';
  }

  const hitNumber = common.get('hitNumber');

  return hitNumber;
};
