import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.group.name',
      description: 'The name of the record type.',
      defaultMessage: 'Group',
    },
    collectionName: {
      id: 'record.group.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Groups',
    },
  }),
  panel: defineMessages({
    info: {
      id: 'panel.group.info',
      defaultMessage: 'Group Information',
    },
  }),
};
