import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.valuation.name',
      description: 'The name of the record type.',
      defaultMessage: 'Valuation Control',
    },
    collectionName: {
      id: 'record.valuation.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Valuation Controls',
    },
  }),
  panel: defineMessages({
    info: {
      id: 'panel.valuation.info',
      defaultMessage: 'Object Valuation Information',
    },
  }),
};
