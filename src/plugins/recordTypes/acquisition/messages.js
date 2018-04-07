import { defineMessages } from 'react-intl';

export default {
  record: defineMessages({
    name: {
      id: 'record.aquisition.name',
      description: 'The name of the record type.',
      defaultMessage: 'Acquisition',
    },
    collectionName: {
      id: 'record.acquisition.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Acquisitions',
    },
  }),
  panel: defineMessages({
    info: {
      id: 'panel.acquisition.info',
      defaultMessage: 'Acquisition Information',
    },
    objectCollectionInformation: {
      id: 'panel.acquisition.objectCollectionInformation',
      defaultMessage: 'Object Collection Information',
    },
    priceInformation: {
      id: 'panel.acquisition.priceInformation',
      defaultMessage: 'Price Information',
    },
  }),
  inputTable: defineMessages({
    acquisitionAuthorizer: {
      id: 'inputTable.acquisition.acquisitionAuthorizer',
      defaultMessage: 'Authorization',
    },
    groupPurchasePrice: {
      id: 'inputTable.acquisition.groupPurchasePrice',
      defaultMessage: 'Group purchase price',
    },
    objectOfferPrice: {
      id: 'inputTable.acquisition.objectOfferPrice',
      defaultMessage: 'Object offer price',
    },
    objectPurchaseOfferPrice: {
      id: 'inputTable.acquisition.objectPurchaseOfferPrice',
      defaultMessage: 'Object purchaser offer price',
    },
    objectPurchasePrice: {
      id: 'inputTable.acquisition.objectPurchasePrice',
      defaultMessage: 'Object purchase price',
    },
    originalObjectPurchasePrice: {
      id: 'inputTable.acquisition.originalObjectPurchasePrice',
      defaultMessage: 'Original object purchase price',
    },
  }),
};
