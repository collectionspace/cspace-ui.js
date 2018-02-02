export default (pluginContext) => {
  const {
    configKey: config,
  } = pluginContext.configHelpers;

  const {
    DATA_TYPE_DATE,
  } = pluginContext.dataTypes;

  const {
    TermPickerInput,
  } = pluginContext.inputComponents;

  return {
    dateDisplayDate: {},
    dateAssociation: {},
    datePeriod: {},
    dateNote: {},
    dateEarliestSingleCertainty: {
      [config]: {
        messages: {
          fullName: {
            id: 'field.ext.structuredDate.dateEarliestSingleCertainty.fullName',
            defaultMessage: 'Earliest/single date certainty',
          },
        },
        view: {
          type: TermPickerInput,
          props: {
            source: 'datecertainty',
          },
        },
      },
    },
    dateEarliestSingleDay: {},
    dateEarliestSingleEra: {
      [config]: {
        messages: {
          fullName: {
            id: 'field.ext.structuredDate.dateEarliestSingleEra.fullName',
            defaultMessage: 'Earliest/single date era',
          },
        },
        view: {
          type: TermPickerInput,
          props: {
            source: 'dateera',
          },
        },
      },
    },
    dateEarliestSingleMonth: {},
    dateEarliestSingleQualifier: {},
    dateEarliestSingleQualifierUnit: {
      [config]: {
        messages: {
          fullName: {
            id: 'field.ext.structuredDate.dateEarliestSingleQualifierUnit.fullName',
            defaultMessage: 'Earliest/single date qualifier unit',
          },
        },
        view: {
          type: TermPickerInput,
          props: {
            source: 'datequalifier',
          },
        },
      },
    },
    dateEarliestSingleQualifierValue: {},
    dateEarliestSingleYear: {},
    dateLatestCertainty: {
      [config]: {
        messages: {
          fullName: {
            id: 'field.ext.structuredDate.dateLatestCertainty.fullName',
            defaultMessage: 'Latest date certainty',
          },
        },
        view: {
          type: TermPickerInput,
          props: {
            source: 'datecertainty',
          },
        },
      },
    },
    dateLatestDay: {},
    dateLatestEra: {
      [config]: {
        messages: {
          fullName: {
            id: 'field.ext.structuredDate.dateLatestEra.fullName',
            defaultMessage: 'Latest date era',
          },
        },
        view: {
          type: TermPickerInput,
          props: {
            source: 'dateera',
          },
        },
      },
    },
    dateLatestMonth: {},
    dateLatestQualifier: {},
    dateLatestQualifierUnit: {
      [config]: {
        messages: {
          fullName: {
            id: 'field.ext.structuredDate.dateLatestQualifierUnit.fullName',
            defaultMessage: 'Latest date qualifier unit',
          },
        },
        view: {
          type: TermPickerInput,
          props: {
            source: 'datequalifier',
          },
        },
      },
    },
    dateLatestQualifierValue: {},
    dateLatestYear: {},
    dateEarliestScalarValue: {
      [config]: {
        dataType: DATA_TYPE_DATE,
      },
    },
    dateLatestScalarValue: {
      [config]: {
        dataType: DATA_TYPE_DATE,
      },
    },
    scalarValuesComputed: {},
  };
};
