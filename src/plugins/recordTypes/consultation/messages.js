import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.consultation.name',
      description: 'The name of the record type',
      defaultMessage: 'Consultation',
    },
    collectionName: {
      id: 'record.consultation.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Consultations',
    },
  }),
  panel: defineMessages({
    info: {
      id: 'panel.consultation.info',
      defaultMessage: 'Consultation Information',
    },
  }),
};
