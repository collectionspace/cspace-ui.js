import { defineMessages } from 'react-intl';

export default (pluginContext) => {
  const {
    CompoundInput,
    DateInput,
    OptionPickerInput,
    TextInput,
    AutocompleteInput,
    IDGeneratorInput,
    TermPickerInput,
  } = pluginContext.inputComponents;

  const {
    configKey: config,
  } = pluginContext.configHelpers;

  const {
    DATA_TYPE_DATETIME,
    DATA_TYPE_FLOAT,
  } = pluginContext.dataTypes;

  return {
    document: {
      [config]: {
        view: {
          type: CompoundInput,
          props: {
            defaultChildSubpath: 'ns2:valuationcontrols_common',
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
      'ns2:valuationcontrols_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/valuationcontrol',
          },
        },
        valuationcontrolRefNumber: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.valuationcontrols_common.valuationcontrolRefNumber.name',
                defaultMessage: 'Valuation control reference number',
              },
            }),
            required: true,
            searchView: {
              type: TextInput,
            },
            view: {
              type: IDGeneratorInput,
              props: {
                idGeneratorName: 'valuationcontrol',
              },
            },
          },
        },
        valueAmountsList: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.valuationcontrols_common.valueAmountsList.name',
                defaultMessage: 'Amounts',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          valueAmounts: {
            [config]: {
              repeating: true,
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                },
              },
            },
            valueAmount: {
              [config]: {
                dataType: DATA_TYPE_FLOAT,
                messages: defineMessages({
                  name: {
                    id: 'field.valuationcontrols_common.valueAmount.name',
                    defaultMessage: 'Amount',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            valueCurrency: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.valuationcontrols_common.valueCurrency.name',
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
          },
        },
        valueDate: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.valuationcontrols_common.valueDate.name',
                defaultMessage: 'Date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        valueRenewalDate: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.valuationcontrols_common.valueRenewalDate.name',
                defaultMessage: 'Renewal date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        valueSource: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.valuationcontrols_common.valueSource.name',
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
        valueType: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.valuationcontrols_common.valueType.name',
                defaultMessage: 'Type',
              },
            }),
            view: {
              type: OptionPickerInput,
              props: {
                source: 'valueType',
              },
            },
          },
        },
        valueNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.valuationcontrols_common.valueNote.name',
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
      },
    },
  };
};
