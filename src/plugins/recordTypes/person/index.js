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
    person: {
      advancedSearch,
      columns,
      messages,
      serviceConfig,
      fields: fields(pluginContext),
      forms: forms(pluginContext),
      title: title(pluginContext),
      subrecords: {
        contact: {
          recordType: 'contact',
          subresource: 'contacts',
          saveStage: 'after',
        },
      },
      vocabularies: {
        all: {
          isCreatable: false,
          messages: defineMessages({
            name: {
              id: 'vocab.person.all.name',
              description: 'The name of the vocabulary.',
              defaultMessage: 'All',
            },
            collectionName: {
              id: 'vocab.person.all.collectionName',
              description: 'The name of a collection of records from the vocabulary.',
              defaultMessage: 'All Persons',
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
              id: 'vocab.person.local.name',
              description: 'The name of the vocabulary.',
              defaultMessage: 'Local',
            },
            collectionName: {
              id: 'vocab.person.local.collectionName',
              description: 'The name of a collection of records from the vocabulary.',
              defaultMessage: 'Local Persons',
            },
          }),
          serviceConfig: {
            servicePath: 'urn:cspace:name(person)',
          },
        },
        ulan: {
          messages: defineMessages({
            name: {
              id: 'vocab.person.ulan.name',
              description: 'The name of the vocabulary.',
              defaultMessage: 'ULAN',
            },
            collectionName: {
              id: 'vocab.person.ulan.collectionName',
              description: 'The name of a collection of records from the vocabulary.',
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
