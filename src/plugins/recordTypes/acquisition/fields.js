import { defineMessages } from 'react-intl';
import getCoreFields from '../../../helpers/coreFields';

export default (pluginContext) => {
  const {
    AutocompleteInput,
    CompoundInput,
    DateInput,
    IDGeneratorInput,
    OptionPickerInput,
    StructuredDateInput,
    TermPickerInput,
    TextInput,
  } = pluginContext.inputComponents;

  const {
    configKey: config,
  } = pluginContext.configHelpers;

  const {
    DATA_TYPE_DATE,
    DATA_TYPE_FLOAT,
  } = pluginContext.dataTypes;

  const coreFields = getCoreFields(pluginContext);

  return {
    document: {
      [config]: {
        view: {
          type: CompoundInput,
          props: {
            defaultChildSubpath: 'ns2:acquisitions_common',
          },
        },
      },
      // Define core fields
      ...coreFields,
      'ns2:acquisitions_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/acquisition',
          },
        },
        acquisitionReferenceNumber: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              name: {
                id: 'field.acquisitions_common.acquisitionReferenceNumber.name',
                defaultMessage: 'Reference number',
              },
            }),
            required: true,
            searchView: {
              type: TextInput,
            },
            view: {
              type: IDGeneratorInput,
              props: {
                idGeneratorName: 'accession,archives,library',
              },
            },
          },
        },
        accessionDateGroup: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.acquisitions_common.accessionDateGroup.name',
                defaultMessage: 'Accession date',
              },
            }),
            view: {
              type: StructuredDateInput,
            },
          },
        },
        acquisitionAuthorizer: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.acquisitions_common.acquisitionAuthorizer.name',
                defaultMessage: 'Authorizer',
              },
            }),
            view: {
              type: AutocompleteInput,
              props: {
                source: 'person/local',
              },
            },
          },
        },
        acquisitionAuthorizerDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              name: {
                id: 'field.acquisitions_common.acquisitionAuthorizerDate.name',
                defaultMessage: 'Date',
              },
              fullName: {
                id: 'field.acquisitions_common.acquisitionAuthorizerDate.fullName',
                defaultMessage: 'Authorization date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        acquisitionDateGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          acquisitionDateGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.acquisitions_common.acquisitionDateGroup.name',
                  defaultMessage: 'Acquisition date',
                },
              }),
              repeating: true,
              view: {
                type: StructuredDateInput,
              },
            },
          },
        },
        acquisitionMethod: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.acquisitions_common.acquisitionMethod.name',
                defaultMessage: 'Acquisition method',
              },
            }),
            view: {
              type: OptionPickerInput,
              props: {
                source: 'acquisitionMethods',
              },
            },
          },
        },
        acquisitionSources: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          acquisitionSource: {
            [config]: {
              repeating: true,
              messages: defineMessages({
                name: {
                  id: 'field.acquisitions_common.acquisitionSource.name',
                  defaultMessage: 'Acquisition source',
                },
              }),
              view: {
                type: AutocompleteInput,
                props: {
                  source: 'person/local,person/shared,organization/local,organization/shared',
                },
              },
            },
          },
        },
        owners: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          owner: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.acquisitions_common.owner.name',
                  defaultMessage: 'Owner',
                },
              }),
              repeating: true,
              view: {
                type: AutocompleteInput,
                props: {
                  source: 'person/local,person/shared,organization/local,organization/shared',
                },
              },
            },
          },
        },
        transferOfTitleNumber: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.acquisitions_common.transferOfTitleNumber.name',
                defaultMessage: 'Transfer of title number',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        creditLine: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.acquisitions_common.creditLine.name',
                defaultMessage: 'Credit line',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        groupPurchasePriceCurrency: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.acquisitions_common.groupPurchasePriceCurrency.name',
                defaultMessage: 'Currency',
              },
            }),
            view: {
              type: TermPickerInput,
              props: {
                source: 'currency',
              },
            },
          },
        },
        groupPurchasePriceValue: {
          [config]: {
            dataType: DATA_TYPE_FLOAT,
            messages: defineMessages({
              name: {
                id: 'field.acquisitions_common.groupPurchasePriceValue.name',
                defaultMessage: 'Value',
              },
              fullName: {
                id: 'field.acquisitions_common.groupPurchasePriceValue.fullName',
                defaultMessage: 'Group purchase price value',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        objectOfferPriceCurrency: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.acquisitions_common.objectOfferPriceCurrency.name',
                defaultMessage: 'Currency',
              },
            }),
            view: {
              type: TermPickerInput,
              props: {
                source: 'currency',
              },
            },
          },
        },
        objectOfferPriceValue: {
          [config]: {
            dataType: DATA_TYPE_FLOAT,
            messages: defineMessages({
              name: {
                id: 'field.acquisitions_common.objectOfferPriceValue.name',
                defaultMessage: 'Value',
              },
              fullName: {
                id: 'field.acquisitions_common.objectOfferPriceValue.fullName',
                defaultMessage: 'Object offer price value',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        objectPurchaseOfferPriceCurrency: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.acquisitions_common.objectPurchaseOfferPriceCurrency.name',
                defaultMessage: 'Currency',
              },
            }),
            view: {
              type: TermPickerInput,
              props: {
                source: 'currency',
              },
            },
          },
        },
        objectPurchaseOfferPriceValue: {
          [config]: {
            dataType: DATA_TYPE_FLOAT,
            messages: defineMessages({
              name: {
                id: 'field.acquisitions_common.objectPurchaseOfferPriceValue.name',
                defaultMessage: 'Value',
              },
              fullName: {
                id: 'field.acquisitions_common.objectPurchaseOfferPriceValue.fullName',
                defaultMessage: 'Object purchaser offer price value',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        objectPurchasePriceCurrency: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.acquisitions_common.objectPurchasePriceCurrency.name',
                defaultMessage: 'Currency',
              },
            }),
            view: {
              type: TermPickerInput,
              props: {
                source: 'currency',
              },
            },
          },
        },
        objectPurchasePriceValue: {
          [config]: {
            dataType: DATA_TYPE_FLOAT,
            messages: defineMessages({
              name: {
                id: 'field.acquisitions_common.objectPurchasePriceValue.name',
                defaultMessage: 'Value',
              },
              fullName: {
                id: 'field.acquisitions_common.objectPurchasePriceValue.fullName',
                defaultMessage: 'Object purchase price value',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        originalObjectPurchasePriceCurrency: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.acquisitions_common.originalObjectPurchasePriceCurrency.name',
                defaultMessage: 'Currency',
              },
            }),
            view: {
              type: TermPickerInput,
              props: {
                source: 'currency',
              },
            },
          },
        },
        originalObjectPurchasePriceValue: {
          [config]: {
            dataType: DATA_TYPE_FLOAT,
            messages: defineMessages({
              name: {
                id: 'field.acquisitions_common.originalObjectPurchasePriceValue.name',
                defaultMessage: 'Value',
              },
              fullName: {
                id: 'field.acquisitions_common.originalObjectPurchasePriceValue.fullName',
                defaultMessage: 'Original object purchase price value',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        acquisitionReason: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.acquisitions_common.acquisitionReason.name',
                defaultMessage: 'Acquisition reason',
              },
            }),
            view: {
              type: TextInput,
              props: {
                multiline: true,
              },
            },
          },
        },
        acquisitionNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.acquisitions_common.acquisitionNote.name',
                defaultMessage: 'Note',
              },
            }),
            view: {
              type: TextInput,
              props: {
                multiline: true,
              },
            },
          },
        },
        acquisitionProvisos: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.acquisitions_common.acquisitionProvisos.name',
                defaultMessage: 'Provisos',
              },
            }),
            view: {
              type: TextInput,
              props: {
                multiline: true,
              },
            },
          },
        },
        acquisitionFundingList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          acquisitionFunding: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.acquisitions_common.acquisitionFunding.name',
                  defaultMessage: 'Funding',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                },
              },
            },
            acquisitionFundingCurrency: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.acquisitions_common.acquisitionFundingCurrency.name',
                    defaultMessage: 'Currency',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'currency',
                  },
                },
              },
            },
            acquisitionFundingValue: {
              [config]: {
                dataType: DATA_TYPE_FLOAT,
                messages: defineMessages({
                  name: {
                    id: 'field.acquisitions_common.acquisitionFundingValue.name',
                    defaultMessage: 'Value',
                  },
                  fullName: {
                    id: 'field.acquisitions_common.acquisitionFundingValue.fullName',
                    defaultMessage: 'Funding value',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            acquisitionFundingSource: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.acquisitions_common.acquisitionFundingSource.name',
                    defaultMessage: 'Funding source',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'person/local,person/shared,organization/local,organization/shared',
                  },
                },
              },
            },
            acquisitionFundingSourceProvisos: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.acquistions_common.acquisitionFundingSourceProvisos.name',
                    defaultMessage: 'Source provisos',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        fieldCollectionEventNames: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          fieldCollectionEventName: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.acquisitions_common.fieldCollectionEventName.name',
                  defaultMessage: 'Field collection event name',
                },
              }),
              repeating: true,
              view: {
                type: TextInput,
              },
            },
          },
        },
      },
    },
  };
};
