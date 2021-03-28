import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.hit.name',
      description: 'The name of the record type.',
      defaultMessage: 'Held-in-Trust',
    },
    collectionName: {
      id: 'record.hit.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Held-in-Trust',
    },
  }),
  panel: defineMessages({
    hitInfo: {
      id: 'panel.hit.hitInfo',
      defaultMessage: 'Held-in-Trust Information',
    },
    fieldCollectionInfo: {
      id: 'panel.hit.fieldCollectionInfo',
      defaultMessage: 'Field Collection Information',
    },
    cultureCareAndHandling: {
      id: 'panel.hit.cultureCareAndHandling',
      defaultMessage: 'Culture Care and Handling',
    },
    correspondence: {
      id: 'panel.hit.correspondence',
      defaultMessage: 'Correspondence',
    },
    file: {
      id: 'panel.media.file',
      defaultMessage: 'File Information',
    },
  }),
};
