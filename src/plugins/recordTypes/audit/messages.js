import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.audit.name',
      description: 'The name of the record type.',
      defaultMessage: 'Audit',
    },
    collectionName: {
      id: 'record.audit.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Audits',
    },
  }),
};
