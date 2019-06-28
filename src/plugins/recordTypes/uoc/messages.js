import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.uoc.name',
      description: 'The name of the record type.',
      defaultMessage: 'Use of Collections',
    },
    collectionName: {
      id: 'record.uoc.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Use of Collections',
    },
  }),
  panel: defineMessages({
    useOfCollections: {
      id: 'panel.uoc.useOfCollections',
      defaultMessage: 'Use of Collections Information',
    },
  }),
  inputTable: defineMessages({
    authorizedBy: {
      id: 'inputTable.uoc.authorizedBy',
      defaultMessage: 'Authorization',
    },
    user: {
      id: 'inputTable.uoc.user',
      defaultMessage: 'User',
    },
    feeCharged: {
      id: 'inputTable.uoc.feeCharged',
      defaultMessage: 'Fee charged',
    },
  }),
};
