import { defineMessages } from 'react-intl';

export default () => ({
  default: {
    name: {
      messages: defineMessages({
        label: {
          id: 'column.batch.default.name',
          defaultMessage: 'Name',
        },
      }),
      order: 10,
      width: 400,
    },
  },
});
