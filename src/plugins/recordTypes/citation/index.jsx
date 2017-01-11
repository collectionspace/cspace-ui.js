import React from 'react';
import { defineMessages } from 'react-intl';

export default () => () => ({
  recordTypes: {
    citation: {
      serviceConfig: {
        serviceName: 'Citations',
        servicePath: 'citationauthorities',
        serviceType: 'authority',

        objectName: 'Citation',

        documentName: 'citations',

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
        resultsTitle: {
          id: 'record.citation.resultsTitle',
          description: 'The name of the record when used as a title describing search results.',
          defaultMessage: 'Citations',
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
              id: 'vocab.citation.all.nameTitle',
              description: 'The name of the vocabulary when used as a title.',
              defaultMessage: 'All Vocabularies',
            },
          }),
          serviceConfig: {
            servicePath: '_ALL_',
          },
          type: 'all',
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
            servicePath: 'urn:cspace:name(citation)',
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
            servicePath: 'urn:cspace:name(worldcat)',
          },
        },
      },
    },
  },
});
