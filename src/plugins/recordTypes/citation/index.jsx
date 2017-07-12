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
      messages: {
        record: defineMessages({
          name: {
            id: 'record.citation.name',
            description: 'The name of the record type.',
            defaultMessage: 'Citation',
          },
          collectionName: {
            id: 'record.citation.collectionName',
            description: 'The name of a collection of records of the type.',
            defaultMessage: 'Citations',
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
              id: 'vocab.citation.all.name',
              description: 'The name of the vocabulary.',
              defaultMessage: 'All',
            },
            collectionName: {
              id: 'vocab.citation.all.collectionName',
              description: 'The name of a collection of records from the vocabulary.',
              defaultMessage: 'All Citations',
            },
          }),
          serviceConfig: {
            servicePath: '_ALL_',
          },
          type: 'all',
        },
        local: {
          messages: defineMessages({
            name: {
              id: 'vocab.citation.local.name',
              description: 'The name of the vocabulary.',
              defaultMessage: 'Local',
            },
            collectionName: {
              id: 'vocab.citation.local.collectionName',
              description: 'The name of a collection of records from the vocabulary.',
              defaultMessage: 'Local Citations',
            },
          }),
          serviceConfig: {
            servicePath: 'urn:cspace:name(citation)',
          },
        },
        worldcat: {
          messages: defineMessages({
            name: {
              id: 'vocab.citation.worldcat.name',
              description: 'The name of the vocabulary.',
              defaultMessage: 'WorldCat',
            },
            collectionName: {
              id: 'vocab.citation.worldcat.collectionName',
              description: 'The name of a collection of records from the vocabulary.',
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
