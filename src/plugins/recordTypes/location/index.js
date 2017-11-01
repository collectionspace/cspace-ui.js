import { defineMessages } from 'react-intl';
import advancedSearch from './advancedSearch';
import columns from './columns';
import fields from './fields';
import forms from './forms';
import messages from './messages';
import optionLists from './optionLists';
import serviceConfig from './serviceConfig';
import title from './title';

export default () => pluginContext => ({
  optionLists,
  recordTypes: {
    location: {
      advancedSearch,
      columns,
      messages,
      serviceConfig,
      defaultForm: 'complete',
      fields: fields(pluginContext),
      forms: forms(pluginContext),
      title: title(pluginContext),
      vocabularies: {
        all: {
          messages: defineMessages({
            name: {
              id: 'vocab.location.all.name',
              description: 'The name of the vocabulary.',
              defaultMessage: 'All',
            },
            collectionName: {
              id: 'vocab.location.all.collectionName',
              description: 'The name of a collection of records from the vocabulary.',
              defaultMessage: 'All Locations',
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
              id: 'vocab.location.local.name',
              description: 'The name of the vocabulary.',
              defaultMessage: 'Local',
            },
            collectionName: {
              id: 'vocab.location.local.collectionName',
              description: 'The name of a collection of records from the vocabulary.',
              defaultMessage: 'Local Storage Locations',
            },
          }),
          serviceConfig: {
            servicePath: 'urn:cspace:name(location)',
          },
        },
        offsite: {
          messages: defineMessages({
            name: {
              id: 'vocab.location.offsite.name',
              description: 'The name of the vocabulary.',
              defaultMessage: 'Offsite',
            },
            collectionName: {
              id: 'vocab.location.offsite.collectionName',
              description: 'The name of a collection of records from the vocabulary.',
              defaultMessage: 'Offsite Storage Locations',
            },
          }),
          serviceConfig: {
            servicePath: 'urn:cspace:name(offsite_sla)',
          },
        },
      },
    },
  },
});
