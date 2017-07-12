import React from 'react';
import { defineMessages } from 'react-intl';

export default () => () => ({
  recordTypes: {
    concept: {
      serviceConfig: {
        serviceName: 'Concepts',
        servicePath: 'conceptauthorities',
        serviceType: 'authority',

        objectName: 'Conceptitem',

        documentName: 'concepts',

        quickAddData: values => ({
          document: {
            '@name': 'concepts',
            'ns2:concepts_common': {
              '@xmlns:ns2': 'http://collectionspace.org/services/concept',
              conceptTermGroupList: {
                conceptTermGroup: {
                  termDisplayName: values.displayName,
                },
              },
            },
          },
        }),
      },
      messages: {
        record: defineMessages({
          name: {
            id: 'record.concept.name',
            description: 'The name of the record type.',
            defaultMessage: 'Concept',
          },
          collectionName: {
            id: 'record.concept.collectionName',
            description: 'The name of a collection of records of the type.',
            defaultMessage: 'Concepts',
          },
        }),
      },
      forms: {
        default: {
          template: <div />,
        },
      },
      title: () => '',
      vocabularies: {
        all: {
          isCreatable: false,
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
      },
    },
  },
});
