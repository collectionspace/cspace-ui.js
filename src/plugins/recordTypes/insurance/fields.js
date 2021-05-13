import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    AutocompleteInput,
    CompoundInput,
    DateInput,
    IDGeneratorInput,
    TermPickerInput,
    TextInput,
  } = configContext.inputComponents;

  const {
    configKey: config,
  } = configContext.configHelpers;

  const {
    DATA_TYPE_DATE,
    DATA_TYPE_FLOAT,
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
            defaultChildSubpath: 'ns2:insurances_common',
          },
        },
      },
      ...extensions.core.fields,
      'ns2:insurances_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/insurance',
          },
        },
        insuranceIndemnityReferenceNumber: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              inUse: {
                id: 'field.insurances_common.insuranceIndemnityReferenceNumber.inUse',
                defaultMessage: 'The reference number {value} is in use by another record.',
              },
              name: {
                id: 'field.insurances_common.insuranceIndemnityReferenceNumber.name',
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
              fieldName: 'insurances_common:insuranceIndemnityReferenceNumber',
            }),
            view: {
              type: IDGeneratorInput,
              props: {
                source: 'insurance,indemnity',
              },
            },
          },
        },
        insuranceIndemnityType: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.insurances_common.insuranceIndemnityType.name',
                defaultMessage: 'Type',
              },
            }),
            view: {
              type: TermPickerInput,
              props: {
                source: 'insurancetype',
              },
            },
          },
        },
        insurerIndemnifier: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.insurances_common.insurerIndemnifier.name',
                defaultMessage: 'Insurer/indemnifier',
              },
            }),
            view: {
              type: AutocompleteInput,
              props: {
                source: 'person/local,person/shared,person/ulan,organization/local,organization/shared,organization/ulan',
              },
            },
          },
        },
        insuranceIndemnityPolicyNumber: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.insurances_common.insuranceIndemnityPolicyNumber.name',
                defaultMessage: 'Policy number',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        insuranceIndemnityCurrency: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.insurances_common.insuranceIndemnityCurrency.fullName',
                defaultMessage: 'Insurance/indemnity price currency',
              },
              name: {
                id: 'field.insurances_common.insuranceIndemnityCurrency.name',
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
        insuranceIndemnityValue: {
          [config]: {
            dataType: DATA_TYPE_FLOAT,
            messages: defineMessages({
              fullName: {
                id: 'field.insurances_common.insuranceIndemnityValue.fullName',
                defaultMessage: 'Insurance/indemnity price value',
              },
              name: {
                id: 'field.insurances_common.insuranceIndemnityValue.name',
                defaultMessage: 'Value',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        minimumLiabilityCurrency: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.insurances_common.minimumLiabilityCurrency.fullName',
                defaultMessage: 'Minimum liability price currency',
              },
              name: {
                id: 'field.insurances_common.minimumLiabilityCurrency.name',
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
        minimumLiabilityValue: {
          [config]: {
            dataType: DATA_TYPE_FLOAT,
            messages: defineMessages({
              fullName: {
                id: 'field.insurances_common.minimumLiabilityValue.fullName',
                defaultMessage: 'Minimum liability price value',
              },
              name: {
                id: 'field.insurances_common.minimumLiabilityValue.name',
                defaultMessage: 'Value',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        insuranceIndemnityAuthorizer: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.insurances_common.insuranceIndemnityAuthorizer.name',
                defaultMessage: 'Authorizer',
              },
            }),
            view: {
              type: AutocompleteInput,
              props: {
                source: 'person/local,person/shared/person/ulan',
              },
            },
          },
        },
        insuranceIndemnityAuthorizationDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              fullName: {
                id: 'field.insurances_common.insuranceIndemnityAuthorizationDate.fullName',
                defaultMessage: 'Authorization date',
              },
              name: {
                id: 'field.insurances_common.insuranceIndemnityAuthorizationDate.name',
                defaultMessage: 'Date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        insuranceIndemnityStatusGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          insuranceIndemnityStatusGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.insurances_common.insuranceIndemnityStatusGroup.name',
                  defaultMessage: 'Status',
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
            insuranceIndemnityStatus: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.insurances_common.insuranceIndemnityStatus.fullName',
                    defaultMessage: 'Status type',
                  },
                  name: {
                    id: 'field.insurances_common.insuranceIndemnityStatus.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'insurancestatus',
                  },
                },
              },
            },
            insuranceIndemnityStatusDate: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.insurances_common.insuranceIndemnityStatusDate.fullName',
                    defaultMessage: 'Status date',
                  },
                  name: {
                    id: 'field.insurances_common.insuranceIndemnityStatusDate.name',
                    defaultMessage: 'Date',
                  },
                }),
                dataType: DATA_TYPE_DATE,
                view: {
                  type: DateInput,
                },
              },
            },
            insuranceIndemnityStatusNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.insurances_common.insuranceIndemnityStatusNote.fullName',
                    defaultMessage: 'Status note',
                  },
                  name: {
                    id: 'field.insurances_common.insuranceIndemnityStatusNote.name',
                    defaultMessage: 'Note',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        insuranceIndemnityNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.insurances_common.insuranceIndemnityNote.name',
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
        quoteProviderGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          quoteProviderGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.insurances_common.quoteProviderGroup.name',
                  defaultMessage: 'Quote',
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
            insuranceIndemnityQuoteProvider: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.insurances_common.insuranceIndemnityQuoteProvider.fullName',
                    defaultMessage: 'Quote provider',
                  },
                  name: {
                    id: 'field.insurances_common.insuranceIndemnityQuoteProvider.name',
                    defaultMessage: 'Provider',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'person/local,person/shared,person/ulan,organization/local,organization/shared,organization/ulan',
                  },
                },
              },
            },
            insuranceIndemnityQuoteCurrency: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.insurances_common.insuranceIndemnityQuoteCurrency.fullName',
                    defaultMessage: 'Quote currency',
                  },
                  name: {
                    id: 'field.insurances_common.insuranceIndemnityQuoteCurrency.name',
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
            insuranceIndemnityQuoteValue: {
              [config]: {
                dataType: DATA_TYPE_FLOAT,
                messages: defineMessages({
                  fullName: {
                    id: 'field.insurances_common.insuranceIndemnityQuoteValue.fullName',
                    defaultMessage: 'Quote value',
                  },
                  name: {
                    id: 'field.insurances_common.insuranceIndemnityQuoteValue.name',
                    defaultMessage: 'Value',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            insuranceIndemnityQuoteDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.insurances_common.insuranceIndemnityQuoteDate.fullName',
                    defaultMessage: 'Quote date',
                  },
                  name: {
                    id: 'field.insurances_common.insuranceIndemnityQuoteDate.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
          },
        },
      },
    },
  };
};
