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
      messageDescriptors: defineMessages({
        recordNameTitle: {
          id: 'record.concept.nameTitle',
          description: 'The name of the record when used as a title.',
          defaultMessage: 'Concept',
        },
        resultsTitle: {
          id: 'record.concept.resultsTitle',
          description: 'The name of the record when used as a title describing search results.',
          defaultMessage: 'Concepts',
        },
      }),
      forms: {
        default: <div />,
      },
      title: () => '',
      vocabularies: {
        all: {
          isCreatable: false,
          messageDescriptors: defineMessages({
            vocabNameTitle: {
              id: 'vocab.concept.all.nameTitle',
              description: 'The name of the vocabulary when used as a title.',
              defaultMessage: 'All Vocabularies',
            },
          }),
          serviceConfig: {
            servicePath: '_ALL_',
          },
          type: 'all',
        },
        associated: {
          messageDescriptors: defineMessages({
            vocabNameTitle: {
              id: 'vocab.concept.associated.nameTitle',
              description: 'The name of the vocabulary when used as a title.',
              defaultMessage: 'Associated Concepts',
            },
          }),
          serviceConfig: {
            servicePath: 'urn:cspace:name(concept)',
          },
        },
        activity: {
          messageDescriptors: defineMessages({
            vocabNameTitle: {
              id: 'vocab.concept.activity.nameTitle',
              description: 'The name of the vocabulary when used as a title.',
              defaultMessage: 'Activity Concepts',
            },
          }),
          serviceConfig: {
            servicePath: 'urn:cspace:name(activity)',
          },
        },
        material: {
          messageDescriptors: defineMessages({
            vocabNameTitle: {
              id: 'vocab.concept.material.nameTitle',
              description: 'The name of the vocabulary when used as a title.',
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
