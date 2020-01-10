import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    configKey: config,
  } = configContext.configHelpers;

  const {
    DATA_TYPE_BOOL,
    DATA_TYPE_DATE,
    DATA_TYPE_INT,
  } = configContext.dataTypes;

  const {
    CheckboxInput,
    DateInput,
    OptionPickerInput,
    TermPickerInput,
    TextInput,
  } = configContext.inputComponents;

  // NB: These field configurations are currently only used for search. For editing, view config
  // for structured date fields is hardcoded into the StructuredDateInput component from
  // cspace-input.

  return {
    dateDisplayDate: {
      [config]: {
        messages: defineMessages({
          fullName: {
            id: 'field.ext.structuredDate.dateDisplayDate.fullName',
            defaultMessage: 'Display date',
          },
        }),
        view: {
          type: TextInput,
        },
      },
    },
    datePeriod: {
      [config]: {
        messages: defineMessages({
          fullName: {
            id: 'field.ext.structuredDate.datePeriod.fullName',
            defaultMessage: 'Period',
          },
        }),
        view: {
          type: TextInput,
        },
      },
    },
    dateAssociation: {
      [config]: {
        messages: defineMessages({
          fullName: {
            id: 'field.ext.structuredDate.dateAssociation.fullName',
            defaultMessage: 'Association',
          },
        }),
        view: {
          type: TextInput,
        },
      },
    },
    dateNote: {
      [config]: {
        messages: defineMessages({
          fullName: {
            id: 'field.ext.structuredDate.dateNote.fullName',
            defaultMessage: 'Note',
          },
        }),
        view: {
          type: TextInput,
        },
      },
    },
    dateEarliestSingleYear: {
      [config]: {
        dataType: DATA_TYPE_INT,
        messages: defineMessages({
          fullName: {
            id: 'field.ext.structuredDate.dateEarliestSingleYear.fullName',
            defaultMessage: 'Earliest/single year',
          },
        }),
        view: {
          type: TextInput,
        },
      },
    },
    dateEarliestSingleMonth: {
      [config]: {
        dataType: DATA_TYPE_INT,
        messages: defineMessages({
          fullName: {
            id: 'field.ext.structuredDate.dateEarliestSingleMonth.fullName',
            defaultMessage: 'Earliest/single month',
          },
        }),
        view: {
          type: TextInput,
        },
      },
    },
    dateEarliestSingleDay: {
      [config]: {
        dataType: DATA_TYPE_INT,
        messages: defineMessages({
          fullName: {
            id: 'field.ext.structuredDate.dateEarliestSingleDay.fullName',
            defaultMessage: 'Earliest/single day',
          },
        }),
        view: {
          type: TextInput,
        },
      },
    },
    dateEarliestSingleEra: {
      [config]: {
        messages: defineMessages({
          fullName: {
            id: 'field.ext.structuredDate.dateEarliestSingleEra.fullName',
            defaultMessage: 'Earliest/single era',
          },
        }),
        view: {
          type: TermPickerInput,
          props: {
            source: 'dateera',
          },
        },
      },
    },
    dateEarliestSingleCertainty: {
      [config]: {
        messages: defineMessages({
          fullName: {
            id: 'field.ext.structuredDate.dateEarliestSingleCertainty.fullName',
            defaultMessage: 'Earliest/single certainty',
          },
        }),
        view: {
          type: TermPickerInput,
          props: {
            source: 'datecertainty',
          },
        },
      },
    },
    dateEarliestSingleQualifier: {
      [config]: {
        messages: defineMessages({
          fullName: {
            id: 'field.ext.structuredDate.dateEarliestSingleQualifier.fullName',
            defaultMessage: 'Earliest/single qualifier',
          },
        }),
        view: {
          type: OptionPickerInput,
          props: {
            source: 'dateQualifiers',
          },
        },
      },
    },
    dateEarliestSingleQualifierValue: {
      [config]: {
        dataType: DATA_TYPE_INT,
        messages: defineMessages({
          fullName: {
            id: 'field.ext.structuredDate.dateEarliestSingleQualifierValue.fullName',
            defaultMessage: 'Earliest/single qualifier value',
          },
        }),
        view: {
          type: TextInput,
        },
      },
    },
    dateEarliestSingleQualifierUnit: {
      [config]: {
        messages: defineMessages({
          fullName: {
            id: 'field.ext.structuredDate.dateEarliestSingleQualifierUnit.fullName',
            defaultMessage: 'Earliest/single qualifier unit',
          },
        }),
        view: {
          type: TermPickerInput,
          props: {
            source: 'datequalifier',
          },
        },
      },
    },
    dateLatestYear: {
      [config]: {
        dataType: DATA_TYPE_INT,
        messages: defineMessages({
          fullName: {
            id: 'field.ext.structuredDate.dateLatestYear.fullName',
            defaultMessage: 'Latest year',
          },
        }),
        view: {
          type: TextInput,
        },
      },
    },
    dateLatestMonth: {
      [config]: {
        dataType: DATA_TYPE_INT,
        messages: defineMessages({
          fullName: {
            id: 'field.ext.structuredDate.dateLatestMonth.fullName',
            defaultMessage: 'Latest month',
          },
        }),
        view: {
          type: TextInput,
        },
      },
    },
    dateLatestDay: {
      [config]: {
        dataType: DATA_TYPE_INT,
        messages: defineMessages({
          fullName: {
            id: 'field.ext.structuredDate.dateLatestDay.fullName',
            defaultMessage: 'Latest day',
          },
        }),
        view: {
          type: TextInput,
        },
      },
    },
    dateLatestEra: {
      [config]: {
        messages: defineMessages({
          fullName: {
            id: 'field.ext.structuredDate.dateLatestEra.fullName',
            defaultMessage: 'Latest era',
          },
        }),
        view: {
          type: TermPickerInput,
          props: {
            source: 'dateera',
          },
        },
      },
    },
    dateLatestCertainty: {
      [config]: {
        messages: defineMessages({
          fullName: {
            id: 'field.ext.structuredDate.dateLatestCertainty.fullName',
            defaultMessage: 'Latest certainty',
          },
        }),
        view: {
          type: TermPickerInput,
          props: {
            source: 'datecertainty',
          },
        },
      },
    },
    dateLatestQualifier: {
      [config]: {
        messages: defineMessages({
          fullName: {
            id: 'field.ext.structuredDate.dateLatestQualifier.fullName',
            defaultMessage: 'Latest qualifier',
          },
        }),
        view: {
          type: OptionPickerInput,
          props: {
            source: 'dateQualifiers',
          },
        },
      },
    },
    dateLatestQualifierValue: {
      [config]: {
        dataType: DATA_TYPE_INT,
        messages: defineMessages({
          fullName: {
            id: 'field.ext.structuredDate.dateLatestQualifierValue.fullName',
            defaultMessage: 'Latest qualifier value',
          },
        }),
        view: {
          type: TextInput,
        },
      },
    },
    dateLatestQualifierUnit: {
      [config]: {
        messages: defineMessages({
          fullName: {
            id: 'field.ext.structuredDate.dateLatestQualifierUnit.fullName',
            defaultMessage: 'Latest qualifier unit',
          },
        }),
        view: {
          type: TermPickerInput,
          props: {
            source: 'datequalifier',
          },
        },
      },
    },
    dateEarliestScalarValue: {
      [config]: {
        dataType: DATA_TYPE_DATE,
        messages: defineMessages({
          fullName: {
            id: 'field.ext.structuredDate.dateEarliestScalarValue.fullName',
            defaultMessage: 'Earliest represented date',
          },
        }),
        view: {
          type: DateInput,
        },
      },
    },
    dateLatestScalarValue: {
      [config]: {
        dataType: DATA_TYPE_DATE,
        messages: defineMessages({
          fullName: {
            id: 'field.ext.structuredDate.dateLatestScalarValue.fullName',
            defaultMessage: 'Latest represented date',
          },
        }),
        view: {
          type: DateInput,
        },
      },
    },
    scalarValuesComputed: {
      [config]: {
        dataType: DATA_TYPE_BOOL,
        messages: defineMessages({
          fullName: {
            id: 'field.ext.structuredDate.scalarValuesComputed.fullName',
            defaultMessage: 'Represented dates computed',
          },
        }),
        view: {
          type: CheckboxInput,
        },
      },
    },
  };
};
