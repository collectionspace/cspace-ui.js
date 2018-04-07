import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.exhibition.name',
      description: 'The name of the record type.',
      defaultMessage: 'Exhibition',
    },
    collectionName: {
      id: 'record.exhibition.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Exhibitions',
    },
  }),
  panel: defineMessages({
    info: {
      id: 'panel.exhibition.info',
      defaultMessage: 'Exhibition Information',
    },
    planningInfo: {
      id: 'panel.exhibition.planningInfo',
      defaultMessage: 'Exhibition Planning Information',
    },
    exhibitedObjectInformation: {
      id: 'panel.exhibition.exhibitedObjectInformation',
      defaultMessage: 'Exhibited Object Information',
    },
  }),
};
