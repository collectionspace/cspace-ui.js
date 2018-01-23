import { defineMessages } from 'react-intl';

export default (pluginContext) => {
  const {
    formatOption,
  } = pluginContext.formatHelpers;

  return {
    default: {
      screenName: {
        messages: defineMessages({
          label: {
            id: 'column.account.default.screenName',
            defaultMessage: 'Full Name',
          },
        }),
        order: 10,
        width: 250,
      },
      status: {
        formatValue: (data, formatterContext) =>
          formatOption('accountStatuses', data, formatterContext),
        messages: defineMessages({
          label: {
            id: 'column.account.default.status',
            defaultMessage: 'Status',
          },
        }),
        order: 20,
        width: 50,
      },
    },
  };
};
