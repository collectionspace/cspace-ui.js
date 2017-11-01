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
    citation: {
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
              id: 'vocab.citation.all.name',
              description: 'The name of the vocabulary.',
              defaultMessage: 'All',
            },
            collectionName: {
              id: 'vocab.citation.all.collectionName',
              description: 'The name of a collection of records from the vocabulary.',
              defaultMessage: 'All Citations',
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
              id: 'vocab.citation.local.name',
              description: 'The name of the vocabulary.',
              defaultMessage: 'Local',
            },
            collectionName: {
              id: 'vocab.citation.local.collectionName',
              description: 'The name of a collection of records from the vocabulary.',
              defaultMessage: 'Local Citations',
            },
          }),
          serviceConfig: {
            servicePath: 'urn:cspace:name(citation)',
          },
        },
        worldcat: {
          messages: defineMessages({
            name: {
              id: 'vocab.citation.worldcat.name',
              description: 'The name of the vocabulary.',
              defaultMessage: 'WorldCat',
            },
            collectionName: {
              id: 'vocab.citation.worldcat.collectionName',
              description: 'The name of a collection of records from the vocabulary.',
              defaultMessage: 'WorldCat Citations',
            },
          }),
          serviceConfig: {
            servicePath: 'urn:cspace:name(worldcat)',
          },
        },
      },
    },
  },
});
