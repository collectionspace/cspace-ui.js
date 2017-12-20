import { defineMessages } from 'react-intl';

export default {
  all: {
    messages: defineMessages({
      name: {
        id: 'vocab.citation.all.name',
        description: 'The name of the vocabulary.',
        defaultMessage: 'All',
      },
      collectionName: {
        id: 'vocab.citation.all.collectionName',
        description: 'The name of a collection of records from the vocabulary.',
        defaultMessage: 'All Citations',
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
        id: 'vocab.citation.local.name',
        description: 'The name of the vocabulary.',
        defaultMessage: 'Local',
      },
      collectionName: {
        id: 'vocab.citation.local.collectionName',
        description: 'The name of a collection of records from the vocabulary.',
        defaultMessage: 'Local Citations',
      },
    }),
    serviceConfig: {
      servicePath: 'urn:cspace:name(citation)',
    },
    sortOrder: 0,
  },
  worldcat: {
    messages: defineMessages({
      name: {
        id: 'vocab.citation.worldcat.name',
        description: 'The name of the vocabulary.',
        defaultMessage: 'WorldCat',
      },
      collectionName: {
        id: 'vocab.citation.worldcat.collectionName',
        description: 'The name of a collection of records from the vocabulary.',
        defaultMessage: 'WorldCat Citations',
      },
    }),
    serviceConfig: {
      servicePath: 'urn:cspace:name(worldcat)',
    },
  },
};
