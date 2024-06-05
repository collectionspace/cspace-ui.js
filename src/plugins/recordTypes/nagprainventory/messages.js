import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.nagprainventory.name',
      description: 'The name of the record',
      defaultMessage: 'NAGPRA Inventory',
    },
    collectionName: {
      id: 'record.nagprainventory.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'NAGPRA Inventories',
    },
  }),
  panel: defineMessages({
    info: {
      id: 'panel.nagprainventory.info',
      defaultMessage: 'Inventory Documentation Information',
    },
    context: {
      id: 'panel.nagprainventory.context',
      defaultMessage: 'Context',
    },
  }),
};
