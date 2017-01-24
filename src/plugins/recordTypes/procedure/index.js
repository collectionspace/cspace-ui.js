import { defineMessages } from 'react-intl';
import columns from './columns';

export default () => () => ({
  recordTypes: {
    procedure: {
      columns,
      isCreatable: false,
      messages: {
        record: defineMessages({
          recordNameTitle: {
            id: 'record.procedure.nameTitle',
            description: 'The name of the record when used as a title.',
            defaultMessage: 'Procedures',
          },
          resultsTitle: {
            id: 'record.procedure.resultsTitle',
            description: 'The name of the record when used as a title describing search results.',
            defaultMessage: 'Procedures',
          },
        }),
      },
      serviceConfig: {
        servicePath: 'servicegroups/procedure/items',
        serviceType: 'utility',
      },
    },
  },
});
