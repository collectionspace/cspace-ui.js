import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    formatOption,
    formatTimestamp,
  } = configContext.formatHelpers;

  return {
    default: {
      conditionCheckRefNumber: {
        messages: defineMessages({
          label: {
            id: 'column.conditioncheck.default.conditionCheckRefNumber',
            defaultMessage: 'Reference number',
          },
        }),
        order: 10,
        sortBy: 'conditionchecks_common:conditionCheckRefNumber',
        width: 200,
      },
      condition: {
        formatValue: (data, formatterContext) => formatOption('conditions', data, formatterContext),
        messages: defineMessages({
          label: {
            id: 'column.conditioncheck.default.condition',
            defaultMessage: 'Condition',
          },
        }),
        order: 20,
        sortBy: 'conditionchecks_common:conditionCheckGroupList/0/condition',
        width: 450,
      },
      updatedAt: {
        formatValue: formatTimestamp,
        messages: defineMessages({
          label: {
            id: 'column.conditioncheck.default.updatedAt',
            defaultMessage: 'Updated',
          },
        }),
        order: 30,
        sortBy: 'collectionspace_core:updatedAt',
        width: 150,
      },
    },
  };
};
