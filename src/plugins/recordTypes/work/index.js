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
    work: {
      advancedSearch,
      columns,
      messages,
      serviceConfig,
      fields: fields(pluginContext),
      forms: forms(pluginContext),
      title: title(pluginContext),
      vocabularies: {
        all: {
          isCreatable: false,
          messages: defineMessages({
            name: {
              id: 'vocab.work.all.name',
              description: 'The name of the vocabulary.',
              defaultMessage: 'All',
            },
            collectionName: {
              id: 'vocab.work.all.collectionName',
              description: 'The name of a collection of records from the vocabulary.',
              defaultMessage: 'All Works',
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
              id: 'vocab.work.local.name',
              description: 'The name of the vocabulary.',
              defaultMessage: 'Local',
            },
            collectionName: {
              id: 'vocab.work.local.collectionName',
              description: 'The name of a collection of records from the vocabulary.',
              defaultMessage: 'Local Works',
            },
          }),
          serviceConfig: {
            servicePath: 'urn:cspace:name(work)',
          },
          sortOrder: 0,
        },
        cona: {
          messages: defineMessages({
            name: {
              id: 'vocab.work.cona.name',
              description: 'The name of the vocabulary.',
              defaultMessage: 'CONA',
            },
            collectionName: {
              id: 'vocab.work.cona.collectionName',
              description: 'The name of a collection of records from the vocabulary.',
              defaultMessage: 'CONA Works',
            },
          }),
          serviceConfig: {
            servicePath: 'urn:cspace:name(cona_work)',
          },
          sortOrder: 1,
        },
      },
    },
  },
});
