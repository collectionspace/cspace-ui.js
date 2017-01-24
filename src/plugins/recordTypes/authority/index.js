import { defineMessages } from 'react-intl';
import columns from './columns';

export default () => () => ({
  recordTypes: {
    authority: {
      columns,
      isCreatable: false,
      messages: {
        record: defineMessages({
          recordNameTitle: {
            id: 'record.authority.nameTitle',
            description: 'The name of the record when used as a title.',
            defaultMessage: 'Authorities',
          },
          resultsTitle: {
            id: 'record.authority.resultsTitle',
            description: 'The name of the record when used as a title describing search results.',
            defaultMessage: 'Authorities',
          },
        }),
      },
      serviceConfig: {
        servicePath: 'servicegroups/authority/items',
        serviceType: 'utility',
      },
    },
  },
});
