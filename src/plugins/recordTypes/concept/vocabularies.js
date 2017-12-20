import { defineMessages } from 'react-intl';

export default {
  all: {
    messages: defineMessages({
      name: {
        id: 'vocab.concept.all.name',
        description: 'The name of the vocabulary.',
        defaultMessage: 'All',
      },
      collectionName: {
        id: 'vocab.concept.all.collectionName',
        description: 'The name of a collection of records from the vocabulary.',
        defaultMessage: 'All Concepts',
      },
    }),
    serviceConfig: {
      servicePath: '_ALL_',
    },
    type: 'all',
  },
  associated: {
    messages: defineMessages({
      name: {
        id: 'vocab.concept.associated.name',
        description: 'The name of the vocabulary.',
        defaultMessage: 'Associated',
      },
      collectionName: {
        id: 'vocab.concept.associated.collectionName',
        description: 'The name of a collection of records from the vocabulary.',
        defaultMessage: 'Associated Concepts',
      },
    }),
    serviceConfig: {
      servicePath: 'urn:cspace:name(concept)',
    },
  },
  activity: {
    messages: defineMessages({
      name: {
        id: 'vocab.concept.activity.name',
        description: 'The name of the vocabulary.',
        defaultMessage: 'Activity',
      },
      collectionName: {
        id: 'vocab.concept.activity.collectionName',
        description: 'The name of a collection of records from the vocabulary.',
        defaultMessage: 'Activity Concepts',
      },
    }),
    serviceConfig: {
      servicePath: 'urn:cspace:name(activity)',
    },
  },
  material: {
    messages: defineMessages({
      name: {
        id: 'vocab.concept.material.name',
        description: 'The name of the vocabulary.',
        defaultMessage: 'Material',
      },
      collectionName: {
        id: 'vocab.concept.material.collectionName',
        description: 'The name of a collection of records from the vocabulary.',
        defaultMessage: 'Material Concepts',
      },
    }),
    serviceConfig: {
      servicePath: 'urn:cspace:name(material_ca)',
    },
  },
};
