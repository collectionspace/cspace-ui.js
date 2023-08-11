import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.chronology.name',
      description: 'The name of the record type.',
      defaultMessage: 'Chronology',
    },
    collectionName: {
      id: 'record.chronology.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Chronologies',
    },
  }),
  panel: defineMessages({
    info: {
      id: 'panel.chronology.info',
      defaultMessage: 'Chronology Information',
    },
    altdate: {
      id: 'panel.chronology.altdate',
      defaultMessage: 'Alternative Date Information',
    },
    hierarchy: {
      id: 'panel.chronology.hierarchy',
      defaultMessage: 'Hierarchy',
    },
  }),
  inputTable: defineMessages({
    termSource: {
      id: 'inputTable.chronology.termSource',
      defaultMessage: 'Source',
    },
  }),
};
