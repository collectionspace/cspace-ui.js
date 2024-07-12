import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.repatriationclaim.name',
      description: 'The name of the record type',
      defaultMessage: 'Claim',
    },
    collectionName: {
      id: 'record.repatriationclaim.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Claims',
    },
  }),
  panel: defineMessages({
    info: {
      id: 'panel.repatriationclaim.info',
      defaultMessage: 'Claim Information',
    },
    context: {
      id: 'panel.repatriationclaim.context',
      defaultMessage: 'Claim Context',
    },
    status: {
      id: 'panel.repatriationclaim.status',
      defaultMessage: 'Claim Status',
    },
    documentation: {
      id: 'panel.repatriationclaim.documentation',
      defaultMessage: 'Claim Documentation',
    },
  }),
};
