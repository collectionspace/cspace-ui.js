import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    CompoundInput,
    DateInput,
    OptionPickerInput,
    TextInput,
    AutocompleteInput,
    IDGeneratorInput,
    TermPickerInput,
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
      ...extensions.core.fields,
      'ns2:valuationcontrols_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/valuationcontrol',
          },
        },
        valuationcontrolRefNumber: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              name: {
                id: 'field.valuationcontrols_common.valuationcontrolRefNumber.name',
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
                source: 'valuationcontrol',
              },
            },
          },
        },
        valueAmountsList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          valueAmounts: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.valuationcontrols_common.valueAmounts.name',
                  defaultMessage: 'Amount',
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
            valueCurrency: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.valuationcontrols_common.valueCurrency.fullName',
                    defaultMessage: 'Amount currency',
                  },
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
            valueAmount: {
              [config]: {
                dataType: DATA_TYPE_FLOAT,
                messages: defineMessages({
                  fullName: {
                    id: 'field.valuationcontrols_common.valueAmount.fullName',
                    defaultMessage: 'Amount value',
                  },
                  name: {
                    id: 'field.valuationcontrols_common.valueAmount.name',
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
        valueDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
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
            dataType: DATA_TYPE_DATE,
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
                source: 'valueTypes',
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
