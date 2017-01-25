import React from 'react';
import { defineMessages } from 'react-intl';

export default () => () => ({
  recordTypes: {
    person: {
      serviceConfig: {
        serviceName: 'Persons',
        servicePath: 'personauthorities',
        serviceType: 'authority',

        objectName: 'Person',

        documentName: 'persons',

        quickAddData: values => ({
          document: {
            '@name': 'persons',
            'ns2:persons_common': {
              '@xmlns:ns2': 'http://collectionspace.org/services/person',
              personTermGroupList: {
                personTermGroup: {
                  termDisplayName: values.displayName,
                },
              },
            },
          },
        }),
      },
      messages: {
        record: defineMessages({
          recordNameTitle: {
            id: 'record.person.nameTitle',
            description: 'The name of the record when used as a title.',
            defaultMessage: 'Person',
          },
          resultsTitle: {
            id: 'record.person.resultsTitle',
            description: 'The name of the record when used as a title describing search results.',
            defaultMessage: 'Persons',
          },
        }),
      },
      forms: {
        default: <div />,
      },
      title: () => '',
      vocabularies: {
        all: {
          isCreatable: false,
          messages: defineMessages({
            vocabNameTitle: {
              id: 'vocab.person.all.nameTitle',
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
          messages: defineMessages({
            vocabNameTitle: {
              id: 'vocab.person.local.nameTitle',
              description: 'The name of the vocabulary when used as a title.',
              defaultMessage: 'Local Persons',
            },
          }),
          serviceConfig: {
            servicePath: 'urn:cspace:name(person)',
          },
        },
        ulan: {
          messages: defineMessages({
            vocabNameTitle: {
              id: 'vocab.person.ulan.nameTitle',
              description: 'The name of the vocabulary when used as a title.',
              defaultMessage: 'ULAN Persons',
            },
          }),
          serviceConfig: {
            servicePath: 'urn:cspace:name(ulan_pa)',
          },
        },
      },
    },
  },
});
