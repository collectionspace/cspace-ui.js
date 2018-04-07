import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.batch.name',
      description: 'The name of the record type.',
      defaultMessage: 'Batch Job',
    },
    collectionName: {
      id: 'record.batch.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Batch Jobs',
    },
  }),
};
