import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.nagpraclaim.name',
      description: 'The name of the record type',
      defaultMessage: 'NAGPRA Claim',
    },
    collectionName: {
      id: 'record.nagpraclaim.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'NAGPRA Claims',
    },
  }),
  panel: defineMessages({
    info: {
      id: 'panel.nagpraclaim.info',
      defaultMessage: 'Claim Information',
    },
    context: {
      id: 'panel.nagpraclaim.context',
      defaultMessage: 'Claim Context',
    },
    status: {
      id: 'panel.nagpraclaim.status',
      defaultMessage: 'Claim Status',
    },
    documentation: {
      id: 'panel.nagpraclaim.documentation',
      defaultMessage: 'Claim Documentation',
    },
  }),
};
