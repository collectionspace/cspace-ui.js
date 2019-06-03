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
      itemName: {
        id: 'vocab.concept.all.itemName',
        description: 'The name of a record from the vocabulary.',
        defaultMessage: 'Concept',
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
      itemName: {
        id: 'vocab.concept.associated.itemName',
        description: 'The name of a record from the vocabulary.',
        defaultMessage: 'Associated Concept',
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
      itemName: {
        id: 'vocab.concept.activity.itemName',
        description: 'The name of a record from the vocabulary.',
        defaultMessage: 'Activity Concept',
      },
    }),
    serviceConfig: {
      servicePath: 'urn:cspace:name(activity)',
    },
  },
  ethculture: {
    messages: defineMessages({
      name: {
        id: 'vocab.concept.ethculture.name',
        description: 'The name of the ethculture concept vocabulary.',
        defaultMessage: 'Ethnographic Culture',
      },
      collectionName: {
        id: 'vocab.concept.ethculture.collectionName',
        description: 'The name of a collection of records from the ethculture concept vocabulary.',
        defaultMessage: 'Ethnographic Cultures',
      },
      itemName: {
        id: 'vocab.concept.ethculture.itemName',
        description: 'The name of a record from the vocabulary.',
        defaultMessage: 'Ethnographic Culture',
      },
    }),
    serviceConfig: {
      servicePath: 'urn:cspace:name(ethculture)',
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
      itemName: {
        id: 'vocab.concept.material.itemName',
        description: 'The name of a record from the vocabulary.',
        defaultMessage: 'Material Concept',
      },
    }),
    serviceConfig: {
      servicePath: 'urn:cspace:name(material_ca)',
    },
  },
};
