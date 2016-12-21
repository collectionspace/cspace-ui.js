import React from 'react';
import { defineMessages } from 'react-intl';

export default () => () => ({
  recordTypes: {
    organization: {
      group: 'authority',
      serviceConfig: {
        name: 'orgauthorities',
        quickAddData: values => ({
          document: {
            '@name': 'organizations',
            'ns2:organizations_common': {
              '@xmlns:ns2': 'http://collectionspace.org/services/organization',
              orgTermGroupList: {
                orgTermGroup: {
                  termDisplayName: values.displayName,
                },
              },
            },
          },
        }),
      },
      messageDescriptors: defineMessages({
        recordNameTitle: {
          id: 'record.organization.nameTitle',
          description: 'The name of the record when used as a title.',
          defaultMessage: 'Organization',
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
              id: 'vocab.organization.all.nameTitle',
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
              id: 'vocab.organization.local.nameTitle',
              description: 'The name of the vocabulary when used as a title.',
              defaultMessage: 'Local Organizations',
            },
          }),
          serviceConfig: {
            name: 'urn:cspace:name(organization)',
          },
        },
        ulan: {
          messageDescriptors: defineMessages({
            vocabNameTitle: {
              id: 'vocab.organization.ulan.nameTitle',
              description: 'The name of the vocabulary when used as a title.',
              defaultMessage: 'ULAN Organizations',
            },
          }),
          serviceConfig: {
            name: 'urn:cspace:name(ulan_oa)',
          },
        },
      },
    },
  },
});
