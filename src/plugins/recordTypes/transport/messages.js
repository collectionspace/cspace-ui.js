import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.transport.name',
      description: 'The name of the record type',
      defaultMessage: 'Transport',
    },
    collectionName: {
      id: 'record.transport.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Transports',
    },
  }),
  panel: defineMessages({
    info: {
      id: 'panel.transport.info',
      defaultMessage: 'Transport Information',
    },
    transportCosts: {
      id: 'panel.transport.costs',
      defaultMessage: 'Transport Costs',
    },
  }),
};
