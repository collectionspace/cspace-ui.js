import { formatOption } from '../../../helpers/formatHelpers';

export default pluginContext => (data, formatterContext) => {
  const {
    getPart,
    deepGet,
  } = pluginContext.recordDataHelpers;

  if (!data) {
    return '';
  }

  const common = getPart(data, 'conditionchecks_common');

  if (!common) {
    return '';
  }

  const conditioncheckRefNumber = common.get('conditionCheckRefNumber');
  const condition = deepGet(common, ['conditionCheckGroupList', 'conditionCheckGroup', 0, 'condition']);
  const formattedCondition = formatOption('conditions', condition, formatterContext);

  return [conditioncheckRefNumber, formattedCondition].filter(part => !!part).join(' – ');
};
