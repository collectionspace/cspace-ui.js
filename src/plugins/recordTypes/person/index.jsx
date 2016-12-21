import React from 'react';
import { defineMessages } from 'react-intl';

export default () => () => ({
  recordTypes: {
    person: {
      group: 'authority',
      serviceConfig: {
        name: 'personauthorities',
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
      messageDescriptors: defineMessages({
        recordNameTitle: {
          id: 'record.person.nameTitle',
          description: 'The name of the record when used as a title.',
          defaultMessage: 'Person',
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
              id: 'vocab.person.all.nameTitle',
              description: 'The name of the vocabulary when used as a title.',
              defaultMessage: 'All vocabularies',
            },
          }),
          serviceConfig: {
            name: '_ALL',
          },
        },
        local: {
          messageDescriptors: defineMessages({
            vocabNameTitle: {
              id: 'vocab.person.local.nameTitle',
              description: 'The name of the vocabulary when used as a title.',
              defaultMessage: 'Local Persons',
            },
          }),
          serviceConfig: {
            name: 'urn:cspace:name(person)',
          },
        },
        ulan: {
          messageDescriptors: defineMessages({
            vocabNameTitle: {
              id: 'vocab.person.ulan.nameTitle',
              description: 'The name of the vocabulary when used as a title.',
              defaultMessage: 'ULAN Persons',
            },
          }),
          serviceConfig: {
            name: 'urn:cspace:name(ulan_pa)',
          },
        },
      },
    },
  },
});
