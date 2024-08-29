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
  nomenclature: {
    messages: defineMessages({
      name: {
        id: 'vocab.concept.nomenclature.name',
        description: 'The name of the nomenclature concept vocabulary.',
        defaultMessage: 'Nomenclature',
      },
      collectionName: {
        id: 'vocab.concept.nomenclature.collectionName',
        description: 'The name of a collection of records from the nomenclature concept vocabulary.',
        defaultMessage: 'Nomenclature Concepts',
      },
      itemName: {
        id: 'vocab.concept.nomenclature.itemName',
        description: 'The name of a record from the vocabulary.',
        defaultMessage: 'Nomenclature',
      },
    }),
    serviceConfig: {
      servicePath: 'urn:cspace:name(nomenclature)',
    },
  },
  occasion: {
    messages: defineMessages({
      name: {
        id: 'vocab.concept.occasion.name',
        description: 'The name of the vocabulary.',
        defaultMessage: 'Occasion',
      },
      collectionName: {
        id: 'vocab.concept.occasion.collectionName',
        description: 'The name of a collection of records from the vocabulary.',
        defaultMessage: 'Occasion Concepts',
      },
      itemName: {
        id: 'vocab.concept.occasion.itemName',
        description: 'The name of a record from the vocabulary.',
        defaultMessage: 'Occasion Concept',
      },
    }),
    serviceConfig: {
      servicePath: 'urn:cspace:name(occasion)',
    },
  },
  ethculture: {
    messages: defineMessages({
      name: {
        id: 'vocab.concept.ethculture.name',
        description: 'The name of the vocabulary.',
        defaultMessage: 'Cultural Group',
      },
      collectionName: {
        id: 'vocab.concept.ethculture.collectionName',
        description: 'The name of a collection of records from the vocabulary.',
        defaultMessage: 'Cultural Groups',
      },
      itemName: {
        id: 'vocab.concept.ethculture.itemName',
        description: 'The name of a record from the vocabulary.',
        defaultMessage: 'Cultural Group',
      },
    }),
    serviceConfig: {
      servicePath: 'urn:cspace:name(ethculture)',
    },
  },
  archculture: {
    messages: defineMessages({
      name: {
        id: 'vocab.concept.archculture.name',
        description: 'The name of the vocabulary.',
        defaultMessage: 'Archaeological Culture',
      },
      collectionName: {
        id: 'vocab.concept.archculture.collectionName',
        description: 'The name of a collection of records from the vocabulary.',
        defaultMessage: 'Archaeological Culture Concepts',
      },
      itemName: {
        id: 'vocab.concept.archculture.itemName',
        description: 'The name of a record from the vocabulary.',
        defaultMessage: 'Archaeological Culture Concept',
      },
    }),
    serviceConfig: {
      servicePath: 'urn:cspace:name(archculture)',
    },
  },
};
