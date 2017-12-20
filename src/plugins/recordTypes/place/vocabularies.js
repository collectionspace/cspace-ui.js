import { defineMessages } from 'react-intl';

export default {
  all: {
    messages: defineMessages({
      name: {
        id: 'vocab.place.all.name',
        description: 'The name of the vocabulary.',
        defaultMessage: 'All',
      },
      collectionName: {
        id: 'vocab.place.all.collectionName',
        description: 'The name of a collection of records from the vocabulary.',
        defaultMessage: 'All Places',
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
        id: 'vocab.place.local.name',
        description: 'The name of the vocabulary.',
        defaultMessage: 'Local',
      },
      collectionName: {
        id: 'vocab.place.local.collectionName',
        description: 'The name of a collection of records from the vocabulary.',
        defaultMessage: 'Local Places',
      },
    }),
    serviceConfig: {
      servicePath: 'urn:cspace:name(place)',
    },
    sortOrder: 0,
  },
  tgn: {
    messages: defineMessages({
      name: {
        id: 'vocab.place.tgn.name',
        description: 'The name of the vocabulary.',
        defaultMessage: 'TGN',
      },
      collectionName: {
        id: 'vocab.place.tgn.collectionName',
        description: 'The name of a collection of records from the vocabulary.',
        defaultMessage: 'TGN Places',
      },
    }),
    serviceConfig: {
      servicePath: 'urn:cspace:name(tgn_place)',
    },
  },
};
