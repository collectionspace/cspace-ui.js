import { defineMessages } from 'react-intl';

export default {
  all: {
    messages: defineMessages({
      name: {
        id: 'vocab.chronology.all.name',
        description: 'The name of the vocabulary.',
        defaultMessage: 'All',
      },
      collectionName: {
        id: 'vocab.chronology.all.collectionName',
        description: 'The name of a collection of records from the vocabulary.',
        defaultMessage: 'All Chronologies',
      },
      itemName: {
        id: 'vocab.chronology.all.itemName',
        description: 'The name of a record from the vocabulary.',
        defaultMessage: 'Chronology',
      },
    }),
    serviceConfig: {
      servicePath: '_ALL_',
    },
    type: 'all',
  },
  era: {
    messages: defineMessages({
      name: {
        id: 'vocab.chronology.era.name',
        description: 'The name of the vocabulary.',
        defaultMessage: 'Era',
      },
      collectionName: {
        id: 'vocab.chronology.era.collectionName',
        description: 'The name of a collection of records from the vocabulary.',
        defaultMessage: 'Era Chronologies',
      },
      itemName: {
        id: 'vocab.chronology.era.itemName',
        description: 'The name of a record from the vocabulary.',
        defaultMessage: 'Era Chronology',
      },
    }),
    serviceConfig: {
      servicePath: 'urn:cspace:name(era)',
    },
    sortOrder: 0,
  },
  event: {
    messages: defineMessages({
      name: {
        id: 'vocab.chronology.event.name',
        description: 'The name of the vocabulary.',
        defaultMessage: 'Event',
      },
      collectionName: {
        id: 'vocab.chronology.event.collectionName',
        description: 'The name of a collection of records from the vocabulary.',
        defaultMessage: 'Event Chronologies',
      },
      itemName: {
        id: 'vocab.chronology.event.itemName',
        description: 'The name of a record from the vocabulary.',
        defaultMessage: 'Event Chronology',
      },
    }),
    serviceConfig: {
      servicePath: 'urn:cspace:name(event)',
    },
  },
};
