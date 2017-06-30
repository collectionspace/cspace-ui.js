import { defineMessages } from 'react-intl';

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
    DATA_TYPE_DATETIME,
    DATA_TYPE_INT,
  } = pluginContext.dataTypes;

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
      // TODO: Define core fields in one place.
      'ns2:collectionspace_core': {
        createdAt: {
          [config]: {
            dataType: DATA_TYPE_DATETIME,
            view: {
              type: DateInput,
            },
          },
        },
        createdBy: {
          [config]: {
            view: {
              type: TextInput,
            },
          },
        },
        updatedAt: {
          [config]: {
            dataType: DATA_TYPE_DATETIME,
            messages: defineMessages({
              name: {
                id: 'field.collectionspace_core.updatedAt.name',
                defaultMessage: 'Last updated time',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        updatedBy: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionspace_core.updatedBy.name',
                defaultMessage: 'Last updated by',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
      },
      'ns2:acquisitions_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/acquisition',
          },
        },
        acquisitionReferenceNumber: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.acquisitions_common.acquisitionReferenceNumber.name',
                defaultMessage: 'Acquisition reference number',
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
                defaultMessage: 'Acquisition authorizer',
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
            messages: defineMessages({
              name: {
                id: 'field.acquisitions_common.acquisitionAuthorizerDate.name',
                defaultMessage: 'Acquisition authorizer date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        acquisitionDateGroupList: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.acquisitions_common.acquisitionDateGroupList.name',
                defaultMessage: 'Acquisition date',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          acquisitionDateGroup: {
            [config]: {
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
                source: 'acquisitionMethod',
              },
            },
          },
        },
        acquisitionSources: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.acquisitions_common.acquisitionSources.name',
                defaultMessage: 'Acquisition source',
              },
            }),
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
            messages: defineMessages({
              name: {
                id: 'field.acquisitions_common.owners.name',
                defaultMessage: 'Owner',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          owner: {
            [config]: {
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
            messages: defineMessages({
              name: {
                id: 'field.acquisitions_common.groupPurchasePriceValue.name',
                defaultMessage: 'Value',
              },
            }),
            dataType: DATA_TYPE_INT,
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
            messages: defineMessages({
              name: {
                id: 'field.acquisitions_common.objectOfferPriceValue.name',
                defaultMessage: 'Value',
              },
            }),
            dataType: DATA_TYPE_INT,
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
            messages: defineMessages({
              name: {
                id: 'field.acquisitions_common.objectPurchaseOfferPriceValue.name',
                defaultMessage: 'Value',
              },
            }),
            dataType: DATA_TYPE_INT,
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
            messages: defineMessages({
              name: {
                id: 'field.acquisitions_common.objectPurchasePriceValue.name',
                defaultMessage: 'Value',
              },
            }),
            dataType: DATA_TYPE_INT,
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
            messages: defineMessages({
              name: {
                id: 'field.acquisitions_common.originalObjectPurchasePriceValue.name',
                defaultMessage: 'Value',
              },
            }),
            dataType: DATA_TYPE_INT,
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
                defaultMessage: 'Acquisition note',
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
                defaultMessage: 'Acquisition provisos',
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
            messages: defineMessages({
              name: {
                id: 'field.acquisitions_common.acquisitionFundingList.name',
                defaultMessage: 'Acquisition funding',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          acquisitionFunding: {
            [config]: {
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
                dataType: DATA_TYPE_INT,
                messages: defineMessages({
                  name: {
                    id: 'field.acquisitions_common.acquisitionFundingValue.name',
                    defaultMessage: 'Value',
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
            messages: defineMessages({
              name: {
                id: 'field.acquisitions_common.fieldCollectionEventNames.name',
                defaultMessage: 'Field collection event name',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          fieldCollectionEventName: {
            [config]: {
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
