import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.heldintrust.name',
      description: 'The name of the record type.',
      defaultMessage: 'Held-in-Trust',
    },
    collectionName: {
      id: 'record.heldintrust.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Held-in-Trust',
    },
  }),
  panel: defineMessages({
    heldintrust: {
      id: 'panel.heldintrust.info',
      defaultMessage: 'Held-in-Trust Information',
    },
    cultureCareAndHandling: {
      id: 'panel.heldintrust.cultureCareAndHandling',
      defaultMessage: 'Culture Care and Handling',
    },
    correspondence: {
      id: 'panel.heldintrust.correspondence',
      defaultMessage: 'Correspondence',
    },
  }),
};
