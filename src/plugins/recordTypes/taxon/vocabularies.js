import { defineMessages } from 'react-intl';

export default {
  all: {
    messages: defineMessages({
      name: {
        id: 'vocab.taxon.all.name',
        description: 'The name of the vocabulary.',
        defaultMessage: 'All',
      },
      collectionName: {
        id: 'vocab.taxon.all.collectionName',
        description: 'The name of a collection of records from the vocabulary.',
        defaultMessage: 'All Taxonomic Names',
      },
    }),
    serviceConfig: {
      servicePath: '_ALL_',
    },
    type: 'all',
  },
  local: {
    messages: defineMessages({
      name: {
        id: 'vocab.taxon.local.name',
        description: 'The name of the vocabulary.',
        defaultMessage: 'Local',
      },
      collectionName: {
        id: 'vocab.taxon.local.collectionName',
        description: 'The name of a collection of records from the vocabulary.',
        defaultMessage: 'Local Taxonomic Names',
      },
    }),
    serviceConfig: {
      servicePath: 'urn:cspace:name(taxon)',
    },
    sortOrder: 0,
  },
};
