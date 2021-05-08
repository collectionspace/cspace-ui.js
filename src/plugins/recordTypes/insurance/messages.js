import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.insurance.name',
      description: 'The name of the record type.',
      defaultMessage: 'Insurance/Indemnity',
    },
    collectionName: {
      id: 'record.insurance.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Insurance/Indemnities',
    },
  }),
  inputTable: defineMessages({
    insurancePurchasePrice: {
      id: 'inputTable.insurance.insurancePurchasePrice',
      defaultMessage: 'Insurance/indemnity price',
    },
    minimumLiabilityPrice: {
      id: 'inputTable.insurance.minimumLiabilityPrice',
      defaultMessage: 'Minimum liability price',
    },
    authorization: {
      id: 'inputTable.insurance.authorization',
      defaultMessage: 'Authorization',
    },
  }),
  panel: defineMessages({
    info: {
      id: 'panel.insurance.info',
      defaultMessage: 'Insurance and Indemnity Information',
    },
  }),
};
