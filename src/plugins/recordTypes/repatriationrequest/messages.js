import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.repatriationrequest.name',
      description: 'The name of the record type',
      defaultMessage: 'Repatriation Request',
    },
    collectionName: {
      id: 'record.repatriationrequest.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Repatriation Requests',
    },
  }),
  panel: defineMessages({
    info: {
      id: 'panel.repatriationrequest.info',
      defaultMessage: 'Repatriation Request Information',
    },
    context: {
      id: 'panel.repatriationrequest.context',
      defaultMessage: 'Repatriation Request Context',
    },
    status: {
      id: 'panel.repatriationrequest.status',
      defaultMessage: 'Repatriation Request Status',
    },
    documentation: {
      id: 'panel.repatriationrequest.documentation',
      defaultMessage: 'Repatriation Request Documentation Status',
    },
  }),
};
