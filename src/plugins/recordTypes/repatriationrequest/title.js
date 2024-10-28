export default (configContext) => (data) => {
  const {
    getPart,
  } = configContext.recordDataHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'repatriationrequests_common');

  if (!common) {
    return '';
  }
  const requestNumber = common.get('requestNumber');
  const title = common.get('title');
  return [requestNumber, title].filter((part) => !!part).join(' – ');
};
