import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.pottag.name',
      description: 'The name of the record type.',
      defaultMessage: 'Pot Tag',
    },
    collectionName: {
      id: 'record.pottag.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Pot Tags',
    },
  }),
  panel: defineMessages({
    info: {
      id: 'panel.pottag.info',
      defaultMessage: 'Pot Tag Information',
    },
  }),
};
