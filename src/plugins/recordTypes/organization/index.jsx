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
      messages: {
        record: defineMessages({
          name: {
            id: 'record.organization.name',
            description: 'The name of the record type.',
            defaultMessage: 'Organization',
          },
          collectionName: {
            id: 'record.organization.collectionName',
            description: 'The name of a collection of records of the type.',
            defaultMessage: 'Organizations',
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
              id: 'vocab.organization.all.name',
              description: 'The name of the vocabulary.',
              defaultMessage: 'All',
            },
            collectionName: {
              id: 'vocab.organization.all.collectionName',
              description: 'The name of a collection of records from the vocabulary.',
              defaultMessage: 'All Organizations',
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
              id: 'vocab.organization.local.name',
              description: 'The name of the vocabulary.',
              defaultMessage: 'Local',
            },
            collectionName: {
              id: 'vocab.organization.local.collectionName',
              description: 'The name of a collection of records from the vocabulary.',
              defaultMessage: 'Local Organizations',
            },
          }),
          serviceConfig: {
            servicePath: 'urn:cspace:name(organization)',
          },
        },
        ulan: {
          messages: defineMessages({
            name: {
              id: 'vocab.organization.ulan.name',
              description: 'The name of the vocabulary.',
              defaultMessage: 'ULAN',
            },
            collectionName: {
              id: 'vocab.organization.ulan.collectionName',
              description: 'The name of a collection of records from the vocabulary.',
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
