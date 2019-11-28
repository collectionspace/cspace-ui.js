import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.citation.name',
      description: 'The name of the record type.',
      defaultMessage: 'Citation',
    },
    collectionName: {
      id: 'record.citation.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Citations',
    },
  }),
  panel: defineMessages({
    info: {
      id: 'panel.citation.info',
      defaultMessage: 'Citation Information',
    },
    hierarchy: {
      id: 'panel.citation.hierarchy',
      defaultMessage: 'Hierarchy',
    },
  }),
  inputTable: defineMessages({
    termSource: {
      id: 'inputTable.citation.termSource',
      defaultMessage: 'Source',
    },
  }),
};
