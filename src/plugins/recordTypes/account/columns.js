import { defineMessages } from 'react-intl';

export default (pluginContext) => {
  const {
    formatOption,
  } = pluginContext.formatHelpers;

  return {
    default: [
      {
        name: 'screenName',
        messages: defineMessages({
          label: {
            id: 'column.account.default.screenName',
            defaultMessage: 'Full Name',
          },
        }),
        width: 250,
      },
      {
        name: 'status',
        messages: defineMessages({
          label: {
            id: 'column.account.default.status',
            defaultMessage: 'Status',
          },
        }),
        formatValue: (data, formatterContext) =>
          formatOption('accountStatuses', data, formatterContext),
        width: 50,
      },
    ],
  };
};
