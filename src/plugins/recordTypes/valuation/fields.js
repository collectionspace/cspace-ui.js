import { defineMessages } from 'react-intl';
import getCoreFields from '../../../helpers/coreFields';

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
    DATA_TYPE_FLOAT,
  } = pluginContext.dataTypes;

  const coreFields = getCoreFields(pluginContext);

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
      // Define core fields
      ...coreFields,
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
