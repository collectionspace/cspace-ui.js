import { defineMessages } from 'react-intl';
import columns from './columns';

export default () => () => ({
  recordTypes: {
    object: {
      columns,
      messages: {
        record: defineMessages({
          name: {
            id: 'record.object.name',
            description: 'The name of the record type.',
            defaultMessage: 'Objects',
          },
          collectionName: {
            id: 'record.object.collectionName',
            description: 'The name of a collection of records of the type.',
            defaultMessage: 'Objects',
          },
        }),
      },
      serviceConfig: {
        servicePath: 'servicegroups/object/items',
        serviceType: 'utility',
      },
    },
  },
});
