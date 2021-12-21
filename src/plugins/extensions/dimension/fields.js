import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    AutocompleteInput,
    CompoundInput,
    DateInput,
    OptionPickerInput,
    TextInput,
  } = configContext.inputComponents;

  const {
    configKey: config,
  } = configContext.configHelpers;

  const {
    DATA_TYPE_FLOAT,
    DATA_TYPE_DATE,
  } = configContext.dataTypes;

  return {
    measuredPartGroupList: {
      [config]: {
        view: {
          type: CompoundInput,
        },
      },
      measuredPartGroup: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.ext.dimension.measuredPartGroup.name',
              defaultMessage: 'Dimensions',
            },
          }),
          repeating: true,
          view: {
            type: CompoundInput,
          },
        },
        measuredPart: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.dimension.measuredPart.fullName',
                defaultMessage: 'Measured part',
              },
              name: {
                id: 'field.ext.dimension.measuredPart.name',
                defaultMessage: 'Part',
              },
            }),
            view: {
              type: OptionPickerInput,
              props: {
                source: 'measuredParts',
              },
            },
          },
        },
        dimensionSummary: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.ext.dimension.dimensionSummary.fullName',
                defaultMessage: 'Dimension summary',
              },
              name: {
                id: 'field.ext.dimension.dimensionSummary.name',
                defaultMessage: 'Summary',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        dimensionSubGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          dimensionSubGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.ext.dimension.dimensionSubGroup.name',
                  defaultMessage: 'Measurement',
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
            dimension: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.ext.dimension.dimension.fullName',
                    defaultMessage: 'Measurement dimension',
                  },
                  name: {
                    id: 'field.ext.dimension.dimension.name',
                    defaultMessage: 'Dimension',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'dimensions',
                  },
                },
              },
            },
            measuredBy: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.ext.dimension.measuredBy.name',
                    defaultMessage: 'Measured by',
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
            measurementMethod: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.ext.dimension.measurementMethod.fullName',
                    defaultMessage: 'Measurement method',
                  },
                  name: {
                    id: 'field.ext.dimension.measurementMethod.name',
                    defaultMessage: 'Method',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'measurementMethods',
                  },
                },
              },
            },
            value: {
              [config]: {
                dataType: DATA_TYPE_FLOAT,
                messages: defineMessages({
                  fullName: {
                    id: 'field.ext.dimension.value.fullName',
                    defaultMessage: 'Measurement value',
                  },
                  name: {
                    id: 'field.ext.dimension.value.name',
                    defaultMessage: 'Value',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            measurementUnit: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.ext.dimension.measurementUnit.fullName',
                    defaultMessage: 'Measurement unit',
                  },
                  name: {
                    id: 'field.ext.dimension.measurementUnit.name',
                    defaultMessage: 'Unit',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'measurementUnits',
                  },
                },
              },
            },
            valueQualifier: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.ext.dimension.valueQualifier.fullName',
                    defaultMessage: 'Measurement qualifier',
                  },
                  name: {
                    id: 'field.ext.dimension.valueQualifier.name',
                    defaultMessage: 'Qualifier',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            valueDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.ext.dimension.valueDate.fullName',
                    defaultMessage: 'Measurement date',
                  },
                  name: {
                    id: 'field.ext.dimension.valueDate.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            dimensionNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.ext.dimension.dimensionNote.fullName',
                    defaultMessage: 'Measurement note',
                  },
                  name: {
                    id: 'field.ext.dimension.dimensionNote.name',
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
        measuredPartNote: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'ield.ext.dimension.measuredPartNote.fullName',
                defaultMessage: 'Measurement dimension part note',
              },
              name: {
                id: 'field.ext.dimension.measuredPartNote.name',
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
  };
};
