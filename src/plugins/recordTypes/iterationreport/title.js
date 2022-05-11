export default (configContext) => (data) => {
  const {
    getPart,
  } = configContext.recordDataHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'iterationreports_common');

  if (!common) {
    return '';
  }

  const entryNumber = common.get('iterationIdentificationNumber');

  return [entryNumber].filter((part) => !!part);
};
