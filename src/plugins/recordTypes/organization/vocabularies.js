import { defineMessages } from 'react-intl';

export default {
  all: {
    messages: defineMessages({
      name: {
        id: 'vocab.organization.all.name',
        description: 'The name of the vocabulary.',
        defaultMessage: 'All',
      },
      collectionName: {
        id: 'vocab.organization.all.collectionName',
        description: 'The name of a collection of records from the vocabulary.',
        defaultMessage: 'All Organizations',
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
        id: 'vocab.organization.local.name',
        description: 'The name of the vocabulary.',
        defaultMessage: 'Local',
      },
      collectionName: {
        id: 'vocab.organization.local.collectionName',
        description: 'The name of a collection of records from the vocabulary.',
        defaultMessage: 'Local Organizations',
      },
    }),
    serviceConfig: {
      servicePath: 'urn:cspace:name(organization)',
    },
    sortOrder: 0,
  },
  ulan: {
    messages: defineMessages({
      name: {
        id: 'vocab.organization.ulan.name',
        description: 'The name of the vocabulary.',
        defaultMessage: 'ULAN',
      },
      collectionName: {
        id: 'vocab.organization.ulan.collectionName',
        description: 'The name of a collection of records from the vocabulary.',
        defaultMessage: 'ULAN Organizations',
      },
    }),
    serviceConfig: {
      servicePath: 'urn:cspace:name(ulan_oa)',
    },
  },
};
