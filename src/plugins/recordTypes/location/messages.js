import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.location.name',
      description: 'The name of the record type.',
      defaultMessage: 'Storage Location',
    },
    collectionName: {
      id: 'record.location.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Storage Locations',
    },
  }),
  panel: defineMessages({
    info: {
      id: 'panel.location.info',
      defaultMessage: 'Storage Location Information',
    },
    hierarchy: {
      id: 'panel.location.hierarchy',
      defaultMessage: 'Hierarchy',
    },
  }),
  inputTable: defineMessages({
    termSource: {
      id: 'inputTable.location.termSource',
      defaultMessage: 'Source',
    },
  }),
};
