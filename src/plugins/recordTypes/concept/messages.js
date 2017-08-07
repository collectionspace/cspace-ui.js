import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.concept.name',
      description: 'The name of the record type.',
      defaultMessage: 'Concept',
    },
    collectionName: {
      id: 'record.concept.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Concepts',
    },
  }),
  panel: defineMessages({
    info: {
      id: 'panel.concept.info',
      defaultMessage: 'Concept Authority',
    },
    hierarchy: {
      id: 'panel.concept.hierarchy',
      defaultMessage: 'Hierarchy',
    },
  }),
};
