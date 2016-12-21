import React from 'react';
import { defineMessages } from 'react-intl';

export default () => () => ({
  recordTypes: {
    citation: {
      group: 'authority',
      serviceConfig: {
        name: 'citationauthorities',
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
      vocabularies: {
        all: {
          group: 'all',
          isCreatable: false,
          messageDescriptors: defineMessages({
            vocabNameTitle: {
              id: 'vocab.citation.all.nameTitle',
              description: 'The name of the vocabulary when used as a title.',
              defaultMessage: 'All vocabularies',
            },
          }),
          serviceConfig: {
            name: '_ALL_',
          },
        },
        local: {
          messageDescriptors: defineMessages({
            vocabNameTitle: {
              id: 'vocab.citation.local.nameTitle',
              description: 'The name of the vocabulary when used as a title.',
              defaultMessage: 'Local Citations',
            },
          }),
          serviceConfig: {
            name: 'urn:cspace:name(citation)',
          },
        },
        worldcat: {
          messageDescriptors: defineMessages({
            vocabNameTitle: {
              id: 'vocab.citation.worldcat.nameTitle',
              description: 'The name of the vocabulary when used as a title.',
              defaultMessage: 'WorldCat Citations',
            },
          }),
          serviceConfig: {
            name: 'urn:cspace:name(worldcat)',
          },
        },
      },
    },
  },
});
