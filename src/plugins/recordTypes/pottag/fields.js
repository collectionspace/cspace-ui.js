import { defineMessages } from 'react-intl';
import getCoreFields from '../../../helpers/coreFields';

export default (pluginContext) => {
  const {
    CompoundInput,
    OptionPickerInput,
    TextInput,
    AutocompleteInput,
  } = pluginContext.inputComponents;

  const {
    configKey: config,
  } = pluginContext.configHelpers;

  const {
    DATA_TYPE_INT,
  } = pluginContext.dataTypes;

  const coreFields = getCoreFields(pluginContext);

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
      // Define core fields
      ...coreFields,
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
                source: 'printLabelOptions',
              },
            },
          },
        },
      },
    },
  };
};
