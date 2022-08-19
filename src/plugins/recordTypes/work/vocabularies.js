import { defineMessages } from 'react-intl';

export default {
  all: {
    messages: defineMessages({
      name: {
        id: 'vocab.work.all.name',
        description: 'The name of the vocabulary.',
        defaultMessage: 'All',
      },
      collectionName: {
        id: 'vocab.work.all.collectionName',
        description: 'The name of a collection of records from the vocabulary.',
        defaultMessage: 'All Works',
      },
      itemName: {
        id: 'vocab.work.all.itemName',
        description: 'The name of a record from the vocabulary.',
        defaultMessage: 'Work',
      },
    }),
    serviceConfig: {
      servicePath: '_ALL_',
    },
    type: 'all',
    disableAltTerms: true,
  },
  local: {
    messages: defineMessages({
      name: {
        id: 'vocab.work.local.name',
        description: 'The name of the vocabulary.',
        defaultMessage: 'Local',
      },
      collectionName: {
        id: 'vocab.work.local.collectionName',
        description: 'The name of a collection of records from the vocabulary.',
        defaultMessage: 'Local Works',
      },
      itemName: {
        id: 'vocab.work.local.itemName',
        description: 'The name of a record from the vocabulary.',
        defaultMessage: 'Local Work',
      },
    }),
    serviceConfig: {
      servicePath: 'urn:cspace:name(work)',
    },
    sortOrder: 0,
    disableAltTerms: true,
  },
  cona: {
    messages: defineMessages({
      name: {
        id: 'vocab.work.cona.name',
        description: 'The name of the vocabulary.',
        defaultMessage: 'CONA',
      },
      collectionName: {
        id: 'vocab.work.cona.collectionName',
        description: 'The name of a collection of records from the vocabulary.',
        defaultMessage: 'CONA Works',
      },
      itemName: {
        id: 'vocab.work.cona.itemName',
        description: 'The name of a record from the vocabulary.',
        defaultMessage: 'CONA Work',
      },
    }),
    serviceConfig: {
      servicePath: 'urn:cspace:name(cona_work)',
    },
    disableAltTerms: true,
  },
};
