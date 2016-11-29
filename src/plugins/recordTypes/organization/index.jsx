import React from 'react';
import { defineMessages } from 'react-intl';

export default () => () => ({
  recordTypes: {
    organization: {
      serviceConfig: {
        name: 'orgauthorities',
        isAuthority: true,
        vocabularies: {
          organization: {
            messageDescriptors: defineMessages({
              vocabNameTitle: {
                id: 'vocab.orgauthorities.organization.nameTitle',
                description: 'The name of the vocabulary when used as a title.',
                defaultMessage: 'Local Organizations',
              },
            }),
          },
          ulan_oa: {
            messageDescriptors: defineMessages({
              vocabNameTitle: {
                id: 'vocab.orgauthorities.ulan_oa.nameTitle',
                description: 'The name of the vocabulary when used as a title.',
                defaultMessage: 'ULAN Organizations',
              },
            }),
          },
        },
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
    },
  },
});
