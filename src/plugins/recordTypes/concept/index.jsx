import React from 'react';
import { defineMessages } from 'react-intl';

export default () => () => ({
  recordTypes: {
    concept: {
      serviceConfig: {
        name: 'conceptauthorities',
        isAuthority: true,
        vocabularies: {
          concept: {
            messageDescriptors: defineMessages({
              vocabNameTitle: {
                id: 'vocab.conceptauthorities.concept.nameTitle',
                description: 'The name of the vocabulary when used as a title.',
                defaultMessage: 'Associated Concepts',
              },
            }),
          },
          activity: {
            messageDescriptors: defineMessages({
              vocabNameTitle: {
                id: 'vocab.conceptauthorities.activity.nameTitle',
                description: 'The name of the vocabulary when used as a title.',
                defaultMessage: 'Activity Concepts',
              },
            }),
          },
          material_ca: {
            messageDescriptors: defineMessages({
              vocabNameTitle: {
                id: 'vocab.conceptauthorities.material_ca.nameTitle',
                description: 'The name of the vocabulary when used as a title.',
                defaultMessage: 'Material Concepts',
              },
            }),
          },
        },
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
    },
  },
});
