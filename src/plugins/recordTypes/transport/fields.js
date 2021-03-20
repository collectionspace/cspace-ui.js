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
              name: {
                id: 'field.transports_common.transporter.name',
                defaultMessage: 'Transporter',
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
              name: {
                id: 'field.transports_common.transporterContact.name',
                defaultMessage: 'Transporter contact',
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
              name: {
                id: 'field.transports_common.transporterContactNumber.name',
                defaultMessage: 'Transporter contact number',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        transportAuthorizer: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.transports_common.transportAuthorizer.name',
                defaultMessage: 'Transport authorizer',
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
              name: {
                id: 'field.transports_common.transportAuthorizationDate.name',
                defaultMessage: 'Transport authorization date',
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
              name: {
                id: 'field.transports_common.departurePoint.name',
                defaultMessage: 'Departure point',
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
              name: {
                id: 'field.transports_common.transportDepartureDate.name',
                defaultMessage: 'Departure date',
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
              name: {
                id: 'field.transports_common.transportDepartureTime.name',
                defaultMessage: 'Departure time',
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
              name: {
                id: 'field.transports_common.destination.name',
                defaultMessage: 'Arrival point',
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
              name: {
                id: 'field.transports_common.transportArrivalDate.name',
                defaultMessage: 'Arrival date',
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
              name: {
                id: 'field.transports_common.transportArrivalTime.name',
                defaultMessage: 'Arrival time',
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
                  name: {
                    id: 'field.transports_common.courier.name',
                    defaultMessage: 'Courier',
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
                  name: {
                    id: 'field.transports_common.courierContactNumber.name',
                    defaultMessage: 'Courier contact number',
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
                  name: {
                    id: 'field.transports_common.transportTrackingNumber.name',
                    defaultMessage: 'Tracking number(s)',
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
                  name: {
                    id: 'field.transports_common.transportTrackingNumberNote.name',
                    defaultMessage: 'Tracking number note',
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
                defaultMessage: 'Transport remarks',
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
              name: {
                id: 'field.transports_common.finalShippingCostCurrency.name',
                defaultMessage: 'Final shipping cost currency',
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
              name: {
                id: 'field.transports_common.finalShippingCostValue.name',
                defaultMessage: 'Final shipping cost value',
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
                defaultMessage: 'Transport cost responsbile party',
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
                defaultMessage: 'Insurance/Indemnity cost responsbile party',
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
                  defaultMessage: 'Additional costs',
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
                  name: {
                    id: 'field.transports_common.additionalCostsType.name',
                    defaultMessage: 'Additional costs type',
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
                  name: {
                    id: 'field.transports_common.additionalCostsCurrency.name',
                    defaultMessage: 'Additional costs currency',
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
                  name: {
                    id: 'field.transports_common.additionalCostsValue.name',
                    defaultMessage: 'Additional costs value',
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
              name: {
                id: 'field.transports_common.customsBroker.name',
                defaultMessage: 'Customs broker',
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
              name: {
                id: 'field.transports_common.customsBrokerContact.name',
                defaultMessage: 'Customs broker contact',
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
              name: {
                id: 'field.transports_common.customsDeclaredValueCurrency.name',
                defaultMessage: 'Declared value currency for customs',
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
              name: {
                id: 'field.transports_common.customsDeclaredValueAmount.name',
                defaultMessage: 'Declared value amount for customs',
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
              name: {
                id: 'field.transports_common.customsFeeCurrency.name',
                defaultMessage: 'Customs fee currency',
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
              name: {
                id: 'field.transports_common.customsFeeValue.name',
                defaultMessage: 'Customs fee value',
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
              name: {
                id: 'field.transports_common.customsFeeNote.name',
                defaultMessage: 'Customs fee note',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        shippingQuotesList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          shippingQuotes: {
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
                  name: {
                    id: 'field.transports_common.shippingQuoteProvider.name',
                    defaultMessage: 'Shipping quote provider',
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
                  name: {
                    id: 'field.transports_common.shippingQuoteCurrency.name',
                    defaultMessage: 'Shipping quote currency',
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
                  name: {
                    id: 'field.transports_common.shippingQuoteValue.name',
                    defaultMessage: 'Shipping quote value',
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
                  name: {
                    id: 'field.transports_common.shippingQuoteDate.name',
                    defaultMessage: 'Shipping quote date',
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
