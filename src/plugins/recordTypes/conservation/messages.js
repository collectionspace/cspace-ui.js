import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.conservation.name',
      description: 'The name of the record type.',
      defaultMessage: 'Conservation',
    },
    collectionName: {
      id: 'record.conservation.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Conservations',
    },
  }),
  panel: defineMessages({
    info: {
      id: 'panel.conservation.info',
      defaultMessage: 'Conservation Information',
    },
    objectAnalysisInfo: {
      id: 'panel.conservation.objectAnalysisInfo',
      defaultMessage: 'Object Analysis Information',
    },
  }),
  inputTable: defineMessages({
    approvalInfo: {
      id: 'inputTable.conservation.approvalInfo',
      defaultMessage: 'Approval information',
    },
  }),
};
