import React from 'react';
import { defineMessages } from 'react-intl';

export default () => () => ({
  recordTypes: {
    person: {
      serviceConfig: {
        name: 'personauthorities',
        isAuthority: true,
        vocabularies: {
          person: {
            messageDescriptors: defineMessages({
              vocabNameTitle: {
                id: 'vocab.personauthorities.person.nameTitle',
                description: 'The name of the vocabulary when used as a title.',
                defaultMessage: 'Local Persons',
              },
            }),
          },
          ulan_pa: {
            messageDescriptors: defineMessages({
              vocabNameTitle: {
                id: 'vocab.personauthorities.ulan_pa.nameTitle',
                description: 'The name of the vocabulary when used as a title.',
                defaultMessage: 'ULAN Persons',
              },
            }),
          },
        },
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
    },
  },
});
