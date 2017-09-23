import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.work.name',
      description: 'The name of the record type.',
      defaultMessage: 'Work',
    },
    collectionName: {
      id: 'record.work.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Works',
    },
  }),
  panel: defineMessages({
    info: {
      id: 'panel.work.info',
      defaultMessage: 'Work Information',
    },
    hierarchy: {
      id: 'panel.work.hierarchy',
      defaultMessage: 'Hierarchy',
    },
  }),
  inputTable: defineMessages({
    termSource: {
      id: 'inputTable.work.termSource',
      defaultMessage: 'Source',
    },
  }),
};
