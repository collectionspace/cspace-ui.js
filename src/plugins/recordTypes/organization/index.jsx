import React from 'react';
import { defineMessages } from 'react-intl';

export default () => () => ({
  recordTypes: {
    organization: {
      serviceConfig: {
        serviceName: 'Organizations',
        servicePath: 'orgauthorities',
        serviceType: 'authority',
        
        objectName: 'Organization',
        
        documentName: 'organizations',
        
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
        resultsTitle: {
          id: 'record.organization.resultsTitle',
          description: 'The name of the record when used as a title describing search results.',
          defaultMessage: 'Organizations',
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
              id: 'vocab.organization.all.nameTitle',
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
              id: 'vocab.organization.local.nameTitle',
              description: 'The name of the vocabulary when used as a title.',
              defaultMessage: 'Local Organizations',
            },
          }),
          serviceConfig: {
            servicePath: 'urn:cspace:name(organization)',
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
            servicePath: 'urn:cspace:name(ulan_oa)',
          },
        },
      },
    },
  },
});
