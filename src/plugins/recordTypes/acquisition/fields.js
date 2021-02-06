import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    AutocompleteInput,
    CompoundInput,
    DateInput,
    IDGeneratorInput,
    OptionPickerInput,
    StructuredDateInput,
    TermPickerInput,
    TextInput,
  } = configContext.inputComponents;

  const {
    configKey: config,
  } = configContext.configHelpers;

  const {
    DATA_TYPE_DATE,
    DATA_TYPE_FLOAT,
    DATA_TYPE_STRUCTURED_DATE,
  } = configContext.dataTypes;

  const {
    extensions,
  } = configContext.config;

  const {
    validateNotInUse,
  } = configContext.validationHelpers;

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
      ...extensions.core.fields,
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
              inUse: {
                id: 'field.acquisitions_common.acquisitionReferenceNumber.inUse',
                defaultMessage: 'The reference number {value} is in use by another record.',
              },
              name: {
                id: 'field.acquisitions_common.acquisitionReferenceNumber.name',
                defaultMessage: 'Reference number',
              },
            }),
            required: true,
            searchView: {
              type: TextInput,
            },
            validate: (validationContext) => validateNotInUse({
              configContext,
              validationContext,
              fieldName: 'acquisitions_common:acquisitionReferenceNumber',
            }),
            view: {
              type: IDGeneratorInput,
              props: {
                source: 'accession,archives,library',
              },
            },
          },
        },
        accessionDateGroup: {
          [config]: {
            dataType: DATA_TYPE_STRUCTURED_DATE,
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
          ...extensions.structuredDate.fields,
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
              fullName: {
                id: 'field.acquisitions_common.acquisitionAuthorizerDate.fullName',
                defaultMessage: 'Authorization date',
              },
              name: {
                id: 'field.acquisitions_common.acquisitionAuthorizerDate.name',
                defaultMessage: 'Date',
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
              dataType: DATA_TYPE_STRUCTURED_DATE,
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
            ...extensions.structuredDate.fields,
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
        approvalGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          approvalGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.acquisitions_common.approvalGroup.name',
                  defaultMessage: 'Approval',
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
            approvalGroup: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.acquisitions_common.approvalGroup.approvalGroup.fullName',
                    defaultMessage: 'Approval group',
                  },
                  name: {
                    id: 'field.acquisitions_common.approvalGroup.approvalGroup.name',
                    defaultMessage: 'Group',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'deaccessionapprovalgroup',
                  },
                },
              },
            },
            approvalIndividual: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.acquisitions_common.approvalIndividual.fullName',
                    defaultMessage: 'Approval individual',
                  },
                  name: {
                    id: 'field.acquisitions_common.approvalIndividual.name',
                    defaultMessage: 'Individual',
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
            approvalStatus: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.acquisitions_common.approvalStatus.fullName',
                    defaultMessage: 'Approval status',
                  },
                  name: {
                    id: 'field.acquisitions_common.approvalStatus.name',
                    defaultMessage: 'Status',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'deaccessionapprovalstatus',
                  },
                },
              },
            },
            approvalDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.acquisitions_common.approvalDate.fullName',
                    defaultMessage: 'Approval status date',
                  },
                  name: {
                    id: 'field.acquisitions_common.approvalDate.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            approvalNote: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.acquisitions_common.approvalNote.name',
                    defaultMessage: 'Note',
                  },
                  fullName: {
                    id: 'field.acquisitions_common.approvalNote.fullName',
                    defaultMessage: 'Approval note',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
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
              fullName: {
                id: 'field.acquisitions_common.groupPurchasePriceCurrency.fullName',
                defaultMessage: 'Group purchase price currency',
              },
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
              fullName: {
                id: 'field.acquisitions_common.groupPurchasePriceValue.fullName',
                defaultMessage: 'Group purchase price value',
              },
              name: {
                id: 'field.acquisitions_common.groupPurchasePriceValue.name',
                defaultMessage: 'Value',
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
              fullName: {
                id: 'field.acquisitions_common.objectOfferPriceCurrency.fullName',
                defaultMessage: 'Object offer price currency',
              },
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
              fullName: {
                id: 'field.acquisitions_common.objectOfferPriceValue.fullName',
                defaultMessage: 'Object offer price value',
              },
              name: {
                id: 'field.acquisitions_common.objectOfferPriceValue.name',
                defaultMessage: 'Value',
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
              fullName: {
                id: 'field.acquisitions_common.objectPurchaseOfferPriceCurrency.fullName',
                defaultMessage: 'Object purchaser offer price currency',
              },
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
              fullName: {
                id: 'field.acquisitions_common.objectPurchaseOfferPriceValue.fullName',
                defaultMessage: 'Object purchaser offer price value',
              },
              name: {
                id: 'field.acquisitions_common.objectPurchaseOfferPriceValue.name',
                defaultMessage: 'Value',
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
              fullName: {
                id: 'field.acquisitions_common.objectPurchasePriceCurrency.fullName',
                defaultMessage: 'Object purchase price currency',
              },
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
              fullName: {
                id: 'field.acquisitions_common.objectPurchasePriceValue.fullName',
                defaultMessage: 'Object purchase price value',
              },
              name: {
                id: 'field.acquisitions_common.objectPurchasePriceValue.name',
                defaultMessage: 'Value',
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
              fullName: {
                id: 'field.acquisitions_common.originalObjectPurchasePriceCurrency.fullName',
                defaultMessage: 'Original object purchase price currency',
              },
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
              fullName: {
                id: 'field.acquisitions_common.originalObjectPurchasePriceValue.fullName',
                defaultMessage: 'Original object purchase price value',
              },
              name: {
                id: 'field.acquisitions_common.originalObjectPurchasePriceValue.name',
                defaultMessage: 'Value',
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
                  fullName: {
                    id: 'field.acquisitions_common.acquisitionFundingCurrency.fullName',
                    defaultMessage: 'Funding currency',
                  },
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
                  fullName: {
                    id: 'field.acquisitions_common.acquisitionFundingValue.fullName',
                    defaultMessage: 'Funding value',
                  },
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
                  fullName: {
                    id: 'field.acquisitions_common.acquisitionFundingSource.fullName',
                    defaultMessage: 'Funding source',
                  },
                  name: {
                    id: 'field.acquisitions_common.acquisitionFundingSource.name',
                    defaultMessage: 'Source',
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
                  fullName: {
                    id: 'field.acquisitions_common.acquisitionFundingSourceProvisos.fullName',
                    defaultMessage: 'Funding source provisos',
                  },
                  name: {
                    id: 'field.acquisitions_common.acquisitionFundingSourceProvisos.name',
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
