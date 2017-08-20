import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.person.name',
      description: 'The name of the record type.',
      defaultMessage: 'Person',
    },
    collectionName: {
      id: 'record.person.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Persons',
    },
  }),
  panel: defineMessages({
    info: {
      id: 'panel.person.info',
      defaultMessage: 'Person Information',
    },
    hierarchy: {
      id: 'panel.person.hierarchy',
      defaultMessage: 'Hierarchy',
    },
  }),
  inputTable: defineMessages({
    nameDetail: {
      id: 'inputTable.person.nameDetail',
      defaultMessage: 'Name detail',
    },
    termSource: {
      id: 'inputTable.person.termSource',
      defaultMessage: 'Source',
    },
  }),
};
