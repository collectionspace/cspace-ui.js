import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    AutocompleteInput,
    CompoundInput,
    DateInput,
    IDGeneratorInput,
    TextInput,
    TermPickerInput,
    OptionPickerInput,
  } = configContext.inputComponents;

  const {
    configKey: config,
  } = configContext.configHelpers;

  const {
    DATA_TYPE_INT,
    DATA_TYPE_FLOAT,
    DATA_TYPE_DATE,
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
            defaultChildSubpath: 'ns2:transports_common',
          },
        },
      },
      ...extensions.core.fields,
      'ns2:transports_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/transport',
          },
        },
        transportReferenceNumber: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              inUse: {
                id: 'field.transports_common.transportReferenceNumber.inUse',
                defaultMessage: 'The reference number {value} is in use by another record.',
              },
              name: {
                id: 'field.transports_common.transportReferenceNumber.name',
                defaultMessage: 'Transport reference number',
              },
            }),
            required: true,
            searchView: {
              type: TextInput,
            },
            validate: (validationContext) => validateNotInUse({
              configContext,
              validationContext,
              fieldName: 'transports_common:transportReferenceNumber',
            }),
            view: {
              type: IDGeneratorInput,
              props: {
                source: 'transport',
              },
            },
          },
        },
        transporter: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.transports_common.transporter.fullName',
                defaultMessage: 'Transporter name',
              },
              name: {
                id: 'field.transports_common.transporter.name',
                defaultMessage: 'Name',
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
        transporterContact: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.transports_common.transporterContact.fullName',
                defaultMessage: 'Transporter contact',
              },
              name: {
                id: 'field.transports_common.transporterContact.name',
                defaultMessage: 'Contact',
              },
            }),
            view: {
              type: AutocompleteInput,
              props: {
                source: 'person/local,person/shared',
              },
            },
          },
        },
        transporterContactNumber: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.transports_common.transporterContactNumber.fullName',
                defaultMessage: 'Transporter contact number',
              },
              name: {
                id: 'field.transports_common.transporterContactNumber.name',
                defaultMessage: 'Contact number',
              },
            }),
            view: {
              type: TextInput,
              props: {
                // Suppress Chrome autofill
                autoComplete: 'cspace-number',
              },
            },
          },
        },
        transportAuthorizer: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.transports_common.transportAuthorizer.fullName',
                defaultMessage: 'Transport authorizer',
              },
              name: {
                id: 'field.transports_common.transportAuthorizer.name',
                defaultMessage: 'Authorizer',
              },
            }),
            view: {
              type: AutocompleteInput,
              props: {
                source: 'person/local,person/shared',
              },
            },
          },
        },
        transportAuthorizationDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              fullName: {
                id: 'field.transports_common.transportAuthorizationDate.fullName',
                defaultMessage: 'Authorization date',
              },
              name: {
                id: 'field.transports_common.transportAuthorizationDate.name',
                defaultMessage: 'Date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        departurePoint: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.transports_common.departurePoint.fullName',
                defaultMessage: 'Departure point',
              },
              name: {
                id: 'field.transports_common.departurePoint.name',
                defaultMessage: 'Point',
              },
            }),
            view: {
              type: AutocompleteInput,
              props: {
                source: 'organization/local,organization/shared,place/local',
              },
            },
          },
        },
        transportDepartureDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              fullName: {
                id: 'field.transports_common.transportDepartureDate.fullName',
                defaultMessage: 'Departure date',
              },
              name: {
                id: 'field.transports_common.transportDepartureDate.name',
                defaultMessage: 'Date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        transportDepartureTime: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.transports_common.transportDepartureTime.fullName',
                defaultMessage: 'Departure time',
              },
              name: {
                id: 'field.transports_common.transportDepartureTime.name',
                defaultMessage: 'Time',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        destination: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.transports_common.destination.fullName',
                defaultMessage: 'Arrival point',
              },
              name: {
                id: 'field.transports_common.destination.name',
                defaultMessage: 'Point',
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
        transportArrivalDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              fullName: {
                id: 'field.transports_common.transportArrivalDate.fullName',
                defaultMessage: 'Arrival date',
              },
              name: {
                id: 'field.transports_common.transportArrivalDate.name',
                defaultMessage: 'Date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        transportArrivalTime: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.transports_common.transportArrivalTime.fullName',
                defaultMessage: 'Arrival time',
              },
              name: {
                id: 'field.transports_common.transportArrivalTime.name',
                defaultMessage: 'Time',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        numberOfCrates: {
          [config]: {
            dataType: DATA_TYPE_INT,
            messages: defineMessages({
              name: {
                id: 'field.transports_common.numberOfCrates.name',
                defaultMessage: 'Number of crates/objects',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        transportMethod: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.transports_common.transportMethod.name',
                defaultMessage: 'Transport method',
              },
            }),
            view: {
              type: OptionPickerInput,
              props: {
                source: 'transportMethodTypes',
              },
            },
          },
        },
        courierGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          courierGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'fields.transports_common.courierGroup.name',
                  defaultMessage: 'Courier',
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
            courier: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.transports_common.courier.fullName',
                    defaultMessage: 'Courier name',
                  },
                  name: {
                    id: 'field.transports_common.courier.name',
                    defaultMessage: 'Name',
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
            courierContactNumber: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.transports_common.courierContactNumber.fullName',
                    defaultMessage: 'Courier contact number',
                  },
                  name: {
                    id: 'field.transports_common.courierContactNumber.name',
                    defaultMessage: 'Contact number',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        transportTrackingNumberGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          transportTrackingNumberGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.transports_common.transportTrackingNumberGroup.name',
                  defaultMessage: 'Tracking number',
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
            transportTrackingNumber: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.transports_common.transportTrackingNumber.fullName',
                    defaultMessage: 'Tracking number',
                  },
                  name: {
                    id: 'field.transports_common.transportTrackingNumber.name',
                    defaultMessage: 'Number',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            transportTrackingNumberNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.transports_common.transportTrackingNumberNote.fullName',
                    defaultMessage: 'Tracking number note',
                  },
                  name: {
                    id: 'field.transports_common.transportTrackingNumberNote.name',
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
        transportRemarks: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.transports_common.transportRemarks.name',
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
        transportCostType: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.transports_common.transportCostType.name',
                defaultMessage: 'Transport cost type',
              },
            }),
            view: {
              type: TermPickerInput,
              props: {
                source: 'transportcosttype',
              },
            },
          },
        },
        finalShippingCostCurrency: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.transports_common.finalShippingCostCurrency.fullName',
                defaultMessage: 'Final shipping cost currency',
              },
              name: {
                id: 'field.transports_common.finalShippingCostCurrency.name',
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
        finalShippingCostValue: {
          [config]: {
            dataType: DATA_TYPE_FLOAT,
            messages: defineMessages({
              fullName: {
                id: 'field.transports_common.finalShippingCostValue.fullName',
                defaultMessage: 'Final shipping cost value',
              },
              name: {
                id: 'field.transports_common.finalShippingCostValue.name',
                defaultMessage: 'Value',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        transportCostResponsibleParty: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.transports_common.transportCostResponsibleParty.name',
                defaultMessage: 'Transport cost responsible party',
              },
            }),
            view: {
              type: TermPickerInput,
              props: {
                source: 'transportresponsibleparty',
              },
            },
          },
        },
        insuranceCostResponsibleParty: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.transports_common.insuranceCostResponsibleParty.name',
                defaultMessage: 'Insurance/indemnity cost responsible party',
              },
            }),
            view: {
              type: TermPickerInput,
              props: {
                source: 'transportresponsibleparty',
              },
            },
          },
        },
        additionalCostsGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          additionalCostsGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.transports_common.additionalCostsGroup.name',
                  defaultMessage: 'Additional cost',
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
            additionalCostsType: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.transports_common.additionalCostsType.fullName',
                    defaultMessage: 'Additional cost type',
                  },
                  name: {
                    id: 'field.transports_common.additionalCostsType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'transportadditionalcosttype',
                  },
                },
              },
            },
            additionalCostsCurrency: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.transports_common.additionalCostsCurrency.fullName',
                    defaultMessage: 'Additional cost currency',
                  },
                  name: {
                    id: 'field.transports_common.additionalCostsCurrency.name',
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
            additionalCostsValue: {
              [config]: {
                dataType: DATA_TYPE_FLOAT,
                messages: defineMessages({
                  fullName: {
                    id: 'field.transports_common.additionalCostsValue.fullName',
                    defaultMessage: 'Additional cost value',
                  },
                  name: {
                    id: 'field.transports_common.additionalCostsValue.name',
                    defaultMessage: 'Value',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        customsBroker: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.transports_common.customsBroker.fullName',
                defaultMessage: 'Customs broker name',
              },
              name: {
                id: 'field.transports_common.customsBroker.name',
                defaultMessage: 'Name',
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
        customsBrokerContact: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.transports_common.customsBrokerContact.fullName',
                defaultMessage: 'Customs broker contact',
              },
              name: {
                id: 'field.transports_common.customsBrokerContact.name',
                defaultMessage: 'Contact',
              },
            }),
            view: {
              type: AutocompleteInput,
              props: {
                source: 'person/local,person/shared',
              },
            },
          },
        },
        customsDeclaredValueCurrency: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.transports_common.customsDeclaredValueCurrency.fullName',
                defaultMessage: 'Declared value for customs currency',
              },
              name: {
                id: 'field.transports_common.customsDeclaredValueCurrency.name',
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
        customsDeclaredValueAmount: {
          [config]: {
            dataType: DATA_TYPE_FLOAT,
            messages: defineMessages({
              fullName: {
                id: 'field.transports_common.customsDeclaredValueAmount.fullName',
                defaultMessage: 'Declared value for customs amount',
              },
              name: {
                id: 'field.transports_common.customsDeclaredValueAmount.name',
                defaultMessage: 'Amount',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        customsFeeCurrency: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.transports_common.customsFeeCurrency.fullName',
                defaultMessage: 'Customs fee currency',
              },
              name: {
                id: 'field.transports_common.customsFeeCurrency.name',
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
        customsFeeValue: {
          [config]: {
            dataType: DATA_TYPE_FLOAT,
            messages: defineMessages({
              fullName: {
                id: 'field.transports_common.customsFeeValue.fullName',
                defaultMessage: 'Customs fee value',
              },
              name: {
                id: 'field.transports_common.customsFeeValue.name',
                defaultMessage: 'Value',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        customsFeeNote: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.transports_common.customsFeeNote.fullName',
                defaultMessage: 'Customs fee note',
              },
              name: {
                id: 'field.transports_common.customsFeeNote.name',
                defaultMessage: 'Note',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        shippingQuoteGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          shippingQuoteGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.transports_common.shippingQuotesGroup.name',
                  defaultMessage: 'Shipping quote',
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
            shippingQuoteProvider: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.transports_common.shippingQuoteProvider.fullName',
                    defaultMessage: 'Shipping quote provider',
                  },
                  name: {
                    id: 'field.transports_common.shippingQuoteProvider.name',
                    defaultMessage: 'Provider',
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
            shippingQuoteCurrency: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.transports_common.shippingQuoteCurrency.fullName',
                    defaultMessage: 'Shipping quote currency',
                  },
                  name: {
                    id: 'field.transports_common.shippingQuoteCurrency.name',
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
            shippingQuoteValue: {
              [config]: {
                dataType: DATA_TYPE_FLOAT,
                messages: defineMessages({
                  fullName: {
                    id: 'field.transports_common.shippingQuoteValue.fullName',
                    defaultMessage: 'Shipping quote value',
                  },
                  name: {
                    id: 'field.transports_common.shippingQuoteValue.name',
                    defaultMessage: 'Value',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            shippingQuoteDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.transports_common.shippingQuoteDate.fullName',
                    defaultMessage: 'Shipping quote date',
                  },
                  name: {
                    id: 'field.transports_common.shippingQuoteDate.name',
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
