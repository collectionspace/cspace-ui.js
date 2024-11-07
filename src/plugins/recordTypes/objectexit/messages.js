import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.objectexit.name',
      description: 'The name of the record type.',
      defaultMessage: 'Object Exit (Legacy)',
    },
    collectionName: {
      id: 'record.objectexit.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Object Exits (Legacy)',
    },
  }),
  panel: defineMessages({
    info: {
      id: 'panel.objectexit.info',
      defaultMessage: 'Object Exit Information',
    },
    deaccessionDisposalInfo: {
      id: 'panel.objectexit.deaccessionDisposalInfo',
      defaultMessage: 'Deaccession and Disposal Information',
    },
  }),
  inputTable: defineMessages({
    disposal: {
      id: 'inputTable.objectexit.disposal',
      defaultMessage: 'Disposal',
    },
    groupDisposal: {
      id: 'inputTable.objectexit.groupDisposal',
      defaultMessage: 'Group disposal',
    },
  }),
};
