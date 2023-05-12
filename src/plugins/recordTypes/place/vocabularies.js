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
      itemName: {
        id: 'vocab.place.all.itemName',
        description: 'The name of a record from the vocabulary.',
        defaultMessage: 'Place',
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
      itemName: {
        id: 'vocab.place.local.itemName',
        description: 'The name of a record from the vocabulary.',
        defaultMessage: 'Local Place',
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
      itemName: {
        id: 'vocab.place.tgn.itemName',
        description: 'The name of a record from the vocabulary.',
        defaultMessage: 'TGN Place',
      },
    }),
    serviceConfig: {
      servicePath: 'urn:cspace:name(tgn_place)',
    },
  },
  archaeological: {
    messages: defineMessages({
      name: {
        id: 'vocab.place.archaeological.name',
        description: 'The name of the vocabulary',
        defaultMessage: 'Archaeological',
      },
      collectionName: {
        id: 'vocab.place.archaeological.collectionName',
        description: 'The name of a collection of records from the vocabulary',
        defaultMessage: 'Archaeological Sites',
      },
      itemName: {
        id: 'vocab.place.archaeological.itemName',
        description: 'The name of a record from the vocabulary',
        defaultMessage: 'Archaeological Site',
      },
    }),
    serviceConfig: {
      servicePath: 'urn:cspace:name(archaeological)',
    },
  },
};
