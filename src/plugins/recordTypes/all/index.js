import { defineMessages } from 'react-intl';
import columns from './columns';

export default () => () => ({
  recordTypes: {
    all: {
      columns,
      isCreatable: false,
      messages: {
        record: defineMessages({
          name: {
            id: 'record.all.name',
            description: 'The name of the record type.',
            defaultMessage: 'All Records',
          },
          collectionName: {
            id: 'record.all.collectionName',
            description: 'The name of a collection of records of the type.',
            defaultMessage: 'All Records',
          },
        }),
      },
      serviceConfig: {
        servicePath: 'servicegroups/common/items',
        serviceType: 'utility',
      },
    },
  },
});
