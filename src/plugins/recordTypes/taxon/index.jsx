import React from 'react';
import { defineMessages } from 'react-intl';
import advancedSearch from './advancedSearch';
import columns from './columns';
import fields from './fields';
import forms from './forms';
import messages from './messages';
import optionLists from './optionLists';
import serviceConfig from './serviceConfig';
import title from './title';

export default () => () => ({
  recordTypes: {
    taxon: {
      serviceConfig: {
        serviceName: 'Taxonomyauthority',
        servicePath: 'taxonomyauthority',
        serviceType: 'authority',

        objectName: 'Taxon',

        documentName: 'taxon',

        quickAddData: values => ({
          document: {
            '@name': 'taxon',
            'ns2:taxon_common': {
              '@xmlns:ns2': 'http://collectionspace.org/services/taxonomy',
              taxonTermGroupList: {
                taxonTermGroup: {
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
            id: 'record.taxon.name',
            description: 'The name of the record type.',
            defaultMessage: 'Taxon',
          },
          collectionName: {
            id: 'record.taxon.collectionName',
            description: 'The name of a collection of records of the type.',
            defaultMessage: 'Taxons',
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
              id: 'vocab.taxon.all.name',
              description: 'The name of the vocabulary.',
              defaultMessage: 'All',
            },
            collectionName: {
              id: 'vocab.taxon.all.collectionName',
              description: 'The name of a collection of records from the vocabulary.',
              defaultMessage: 'All Taxons',
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
              id: 'vocab.taxon.local.name',
              description: 'The name of the vocabulary.',
              defaultMessage: 'Local',
            },
            collectionName: {
              id: 'vocab.taxon.local.collectionName',
              description: 'The name of a collection of records from the vocabulary.',
              defaultMessage: 'Local Taxons',
            },
          }),
          serviceConfig: {
            servicePath: 'urn:cspace:name(taxon)',
          },
        },
      },
    },
  },
});
