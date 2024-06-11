import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.summarydocumentation.name',
      description: 'The name of the record type',
      defaultMessage: 'Summary Documentation',
    },
    collectionName: {
      id: 'record.summarydocumentation.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Summary Documentations',
    },
  }),
  panel: defineMessages({
    info: {
      id: 'panel.summarydocumentation.info',
      defaultMessage: 'Summary Documentation Information',
    },
    context: {
      id: 'panel.summarydocumentation.context',
      defaultMessage: 'Context',
    },
  }),
};
