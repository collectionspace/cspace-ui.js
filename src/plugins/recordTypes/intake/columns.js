import { defineMessages } from 'react-intl';

export default (pluginContext) => {
  const {
    formatRefName,
    formatTimestamp,
  } = pluginContext.formatHelpers;

  return {
    default: {
      entryNumber: {
        messages: defineMessages({
          label: {
            id: 'column.intake.default.entryNumber',
            defaultMessage: 'Entry number',
          },
        }),
        order: 10,
        sortBy: 'intakes_common:entryNumber',
        width: 200,
      },
      currentOwner: {
        formatValue: formatRefName,
        messages: defineMessages({
          label: {
            id: 'column.intake.default.currentOwner',
            defaultMessage: 'Current owner',
          },
        }),
        order: 20,
        sortBy: 'intakes_common:currentOwner',
        width: 450,
      },
      updatedAt: {
        formatValue: formatTimestamp,
        messages: defineMessages({
          label: {
            id: 'column.intake.default.updatedAt',
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
