import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.media.name',
      description: 'The name of the record type.',
      defaultMessage: 'Media Handling',
    },
    collectionName: {
      id: 'record.media.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Media Handling',
    },
  }),
  panel: defineMessages({
    media: {
      id: 'panel.media.media',
      defaultMessage: 'Media Handling Information',
    },
    file: {
      id: 'panel.media.file',
      defaultMessage: 'File Information',
    },
  }),
};
