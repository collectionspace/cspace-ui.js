import React from 'react';
import { defineMessages } from 'react-intl';

export default () => () => ({
  recordTypes: {
    concept: {
      group: 'authority',
      serviceConfig: {
        name: 'conceptauthorities',
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
      }),
      forms: {
        default: <div />,
      },
      title: () => '',
      vocabularies: {
        all: {
          group: 'all',
          isCreatable: false,
          messageDescriptors: defineMessages({
            vocabNameTitle: {
              id: 'vocab.concept.all.nameTitle',
              description: 'The name of the vocabulary when used as a title.',
              defaultMessage: 'All vocabularies',
            },
          }),
          serviceConfig: {
            name: '_ALL_',
          },
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
            name: 'urn:cspace:name(concept)',
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
            name: 'urn:cspace:name(activity)',
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
            name: 'urn:cspace:name(material_ca)',
          },
        },
      },
    },
  },
});
