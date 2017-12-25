import { defineMessages } from 'react-intl';

export default (pluginContext) => {
  const {
    formatRefName,
    formatTimestamp,
  } = pluginContext.formatHelpers;

  return {
    default: [
      {
        name: 'entryNumber',
        messages: defineMessages({
          label: {
            id: 'column.intake.default.entryNumber',
            defaultMessage: 'Entry number',
          },
        }),
        sortBy: 'intakes_common:entryNumber',
        width: 200,
      },
      {
        name: 'currentOwner',
        messages: defineMessages({
          label: {
            id: 'column.intake.default.currentOwner',
            defaultMessage: 'Current owner',
          },
        }),
        formatValue: formatRefName,
        sortBy: 'intakes_common:currentOwner',
        width: 450,
      },
      {
        name: 'updatedAt',
        messages: defineMessages({
          label: {
            id: 'column.intake.default.updatedAt',
            defaultMessage: 'Updated',
          },
        }),
        formatValue: formatTimestamp,
        sortBy: 'collectionspace_core:updatedAt',
        width: 150,
      },
    ],
  };
};
