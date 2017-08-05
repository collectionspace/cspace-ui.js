import { defineMessages } from 'react-intl';

export default (pluginContext) => {
  const {
    CompoundInput,
    DateInput,
    OptionPickerInput,
    TextInput,
    AutocompleteInput,
    IDGeneratorInput,
    // TermPickerInput,
    // StructuredDateInput,
    // URLInput,
  } = pluginContext.inputComponents;

  const {
    configKey: config,
  } = pluginContext.configHelpers;

  const {
    DATA_TYPE_DATETIME,
    DATA_TYPE_FLOAT,
	DATA_TYPE_INT,
  } = pluginContext.dataTypes;

  return {
    document: {
      [config]: {
        view: {
          type: CompoundInput,
          props: {
            defaultChildSubpath: 'ns2:pottags_common',
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
      'ns2:pottags_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/pottag',
          },
        },
        taxonName: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.pottags_common.taxonName.name',
                defaultMessage: 'Taxon',
              },
            }),
            view: {
              type: AutocompleteInput,
              props: {
                source: 'taxon/local',
              },
            },
          },
        },
        family: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.pottags_common.family.name',
                defaultMessage: 'Family',
              },
            }),
            view: {
              type: AutocompleteInput,
              props: {
                source: 'taxon/local',
              },
            },
          },
        },
        commonName: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.pottags_common.commonName.name',
                defaultMessage: 'Common Name',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
		locale: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.pottags_common.local.name',
                defaultMessage: 'Locale',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
		labelData: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.pottags_common.labelData.name',
                defaultMessage: 'Label data',
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
		numberOfLabels: {
          [config]: {
            dataType: DATA_TYPE_INT,
            messages: defineMessages({
              name: {
                id: 'field.pottags_common.numberOfLabels.name',
                defaultMessage: 'Number of labels',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
		printLabels: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.pottags_common.printLabels.name',
                defaultMessage: 'Print labels',
              },
            }),
            view: {
              type: OptionPickerInput,
              props: {
                source: 'printLabels',
              },
            },
          },
        },
      },
    },
  };
};
