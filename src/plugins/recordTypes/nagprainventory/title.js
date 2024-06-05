export default (configContext) => (data) => {
  const {
    deepGet,
    getPart,
  } = configContext.recordDataHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'nagprainventories_common');

  if (!common) {
    return '';
  }

  const inventoryNumber = common.get('inventoryNumber');
  const title = deepGet(common, ['titles', 'title', 0]);

  return [inventoryNumber, title].filter((part) => !!part).join(' – ');
};
