import { defineMessages } from 'react-intl';

export default {
  all: {
    messages: defineMessages({
      name: {
        id: 'vocab.location.all.name',
        description: 'The name of the vocabulary.',
        defaultMessage: 'All',
      },
      collectionName: {
        id: 'vocab.location.all.collectionName',
        description: 'The name of a collection of records from the vocabulary.',
        defaultMessage: 'All Locations',
      },
      itemName: {
        id: 'vocab.location.all.itemName',
        description: 'The name of a record from the vocabulary.',
        defaultMessage: 'Location',
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
        id: 'vocab.location.local.name',
        description: 'The name of the vocabulary.',
        defaultMessage: 'Local',
      },
      collectionName: {
        id: 'vocab.location.local.collectionName',
        description: 'The name of a collection of records from the vocabulary.',
        defaultMessage: 'Local Storage Locations',
      },
      itemName: {
        id: 'vocab.location.local.itemName',
        description: 'The name of a record from the vocabulary.',
        defaultMessage: 'Local Storage Location',
      },
    }),
    serviceConfig: {
      servicePath: 'urn:cspace:name(location)',
    },
    sortOrder: 0,
    disableAltTerms: true,
  },
  offsite: {
    messages: defineMessages({
      name: {
        id: 'vocab.location.offsite.name',
        description: 'The name of the vocabulary.',
        defaultMessage: 'Offsite',
      },
      collectionName: {
        id: 'vocab.location.offsite.collectionName',
        description: 'The name of a collection of records from the vocabulary.',
        defaultMessage: 'Offsite Storage Locations',
      },
      itemName: {
        id: 'vocab.location.offsite.itemName',
        description: 'The name of a record from the vocabulary.',
        defaultMessage: 'Offsite Storage Location',
      },
    }),
    serviceConfig: {
      servicePath: 'urn:cspace:name(offsite_sla)',
    },
    disableAltTerms: true,
  },
};
