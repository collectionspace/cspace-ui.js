import { defineMessages } from 'react-intl';

// FIXME: Plugins shouldn't have to import react-intl, since this unnecessarily increases the size
// when built as a standalone package. Instead, defineMessages should be supplied in the
// pluginContext. But this means that messages won't be extracted by the Babel plugin, since it
// only operates on files that import react-intl.

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
      defaultMessage: 'Acquisitions Information',
    },
    objectCollectionInformation: {
      id: 'panel.acquisition.objectCollectionInformation',
      defaultMessage: 'Object Collection Information',
    },
    priceInformation: {
      id: 'panel.acquisition.priceInformation',
      defaultMessage: 'Price information',
    },
  }),
  inputTable: defineMessages({
    acquisitionAuthorizer: {
      id: 'inputTable.acquisition.acquisitionAuthorizer',
      defaultMessage: 'Acquisition authorizer',
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
