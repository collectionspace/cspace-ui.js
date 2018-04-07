import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.account.name',
      description: 'The name of the record type.',
      defaultMessage: 'User',
    },
    collectionName: {
      id: 'record.account.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Users',
    },
  }),
};
