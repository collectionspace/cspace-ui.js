import { defineMessages } from 'react-intl';

export default () => () => ({
  recordTypes: {
    all: {
      group: 'all',
      isCreatable: false,
      messageDescriptors: defineMessages({
        recordNameTitle: {
          id: 'record.all.nameTitle',
          description: 'The name of the record when used as a title.',
          defaultMessage: 'All record types',
        },
      }),
      serviceConfig: {
        name: 'servicegroups/common/items',
      },
    },
  },
});
