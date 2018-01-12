import { defineMessages } from 'react-intl';

export default () => ({
  default: [
    {
      name: 'displayName',
      messages: defineMessages({
        label: {
          id: 'column.vocabulary.default.displayName',
          defaultMessage: 'Name',
        },
      }),
      sortBy: 'vocabularies_common:displayName',
      width: 250,
    },
  ],
});
