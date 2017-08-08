import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.taxon.name',
      description: 'The name of the record type.',
      defaultMessage: 'Taxon',
    },
    collectionName: {
      id: 'record.taxon.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Taxons',
    },
  }),
  panel: defineMessages({
    info: {
      id: 'panel.taxon.info',
      defaultMessage: 'Taxon Authority',
    },
    hierarchy: {
      id: 'panel.taxon.hierarchy',
      defaultMessage: 'Hierarchy',
    },
  }),
};
