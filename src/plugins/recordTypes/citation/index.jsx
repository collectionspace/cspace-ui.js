import React from 'react';
import { defineMessages } from 'react-intl';

export default () => () => ({
  recordTypes: {
    citation: {
      serviceConfig: {
        name: 'citationauthorities',
        isAuthority: true,
        vocabularies: {
          citation: {
            messageDescriptors: defineMessages({
              vocabNameTitle: {
                id: 'vocab.citationauthorities.citation.nameTitle',
                description: 'The name of the vocabulary when used as a title.',
                defaultMessage: 'Local Citations',
              },
            }),
          },
          worldcat: {
            messageDescriptors: defineMessages({
              vocabNameTitle: {
                id: 'vocab.citationauthorities.worldcat.nameTitle',
                description: 'The name of the vocabulary when used as a title.',
                defaultMessage: 'WorldCat Citations',
              },
            }),
          },
        },
        quickAddData: values => ({
          document: {
            '@name': 'citations',
            'ns2:citations_common': {
              '@xmlns:ns2': 'http://collectionspace.org/services/citation',
              citationTermGroupList: {
                citationTermGroup: {
                  termDisplayName: values.displayName,
                },
              },
            },
          },
        }),
      },
      messageDescriptors: defineMessages({
        recordNameTitle: {
          id: 'record.citation.nameTitle',
          description: 'The name of the record when used as a title.',
          defaultMessage: 'Citation',
        },
      }),
      forms: {
        default: <div />,
      },
      title: () => '',
    },
  },
});
