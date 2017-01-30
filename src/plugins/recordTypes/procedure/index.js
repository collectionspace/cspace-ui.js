import { defineMessages } from 'react-intl';
import columns from './columns';

export default () => () => ({
  recordTypes: {
    procedure: {
      columns,
      isCreatable: false,
      messages: {
        record: defineMessages({
          name: {
            id: 'record.procedure.name',
            description: 'The name of the record type.',
            defaultMessage: 'Procedures',
          },
          collectionName: {
            id: 'record.procedure.collectionName',
            description: 'The name of a collection of records of the type.',
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
