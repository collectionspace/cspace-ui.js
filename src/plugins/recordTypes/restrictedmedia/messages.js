import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.restrictedmedia.name',
      description: 'The name of the record type.',
      defaultMessage: 'Restricted Media Handling',
    },
    collectionName: {
      id: 'record.restrictedmedia.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Restricted Media Handling',
    },
  }),
  panel: defineMessages({
    media: {
      id: 'panel.restrictedmedia.media',
      defaultMessage: 'Media Handling Information',
    },
    file: {
      id: 'panel.restrictedmedia.file',
      defaultMessage: 'File Information',
    },
  }),
};
