import { defineMessages } from 'react-intl';
import columns from './columns';

export default () => () => ({
  recordTypes: {
    authority: {
      columns,
      messages: {
        record: defineMessages({
          name: {
            id: 'record.authority.name',
            description: 'The name of the record type.',
            defaultMessage: 'Authorities',
          },
          collectionName: {
            id: 'record.authority.collectionName',
            description: 'The name of a collection of records of the type.',
            defaultMessage: 'Authority Items',
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
