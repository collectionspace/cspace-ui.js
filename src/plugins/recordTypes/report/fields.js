import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    CheckboxInput,
    CompoundInput,
    ObjectNameInput,
    OptionPickerInput,
    TextInput,
  } = configContext.inputComponents;

  const {
    configKey: config,
  } = configContext.configHelpers;

  const {
    DATA_TYPE_BOOL,
  } = configContext.dataTypes;

  return {
    document: {
      [config]: {
        view: {
          type: CompoundInput,
          props: {
            defaultChildSubpath: 'ns2:reports_common',
          },
        },
      },
      'ns2:reports_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/report',
          },
          view: {
            type: CompoundInput,
          },
        },
        name: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.reports_common.name.name',
                defaultMessage: 'Name',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        filename: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.reports_common.filename.name',
                defaultMessage: 'Jasper report file',
              },
            }),
            view: {
              type: TextInput,
              props: {
                readOnly: true,
              },
            },
          },
        },
        notes: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.reports_common.notes.name',
                defaultMessage: 'Description',
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
        supportsNoContext: {
          [config]: {
            dataType: DATA_TYPE_BOOL,
            messages: defineMessages({
              name: {
                id: 'field.reports_common.supportsNoContext.name',
                defaultMessage: 'All records',
              },
            }),
            view: {
              type: CheckboxInput,
            },
          },
        },
        supportsGroup: {
          [config]: {
            dataType: DATA_TYPE_BOOL,
            messages: defineMessages({
              name: {
                id: 'field.reports_common.supportsGroup.name',
                defaultMessage: 'Group',
              },
            }),
            view: {
              type: CheckboxInput,
            },
          },
        },
        supportsDocList: {
          [config]: {
            dataType: DATA_TYPE_BOOL,
            messages: defineMessages({
              name: {
                id: 'field.reports_common.supportsDocList.name',
                defaultMessage: 'Record list',
              },
            }),
            view: {
              type: CheckboxInput,
            },
          },
        },
        supportsSingleDoc: {
          [config]: {
            dataType: DATA_TYPE_BOOL,
            messages: defineMessages({
              name: {
                id: 'field.reports_common.supportsSingleDoc.name',
                defaultMessage: 'Single record',
              },
            }),
            view: {
              type: CheckboxInput,
            },
          },
        },
        forDocTypes: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          forDocType: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.reports_common.forDocType.name',
                  defaultMessage: 'For record type',
                },
              }),
              repeating: true,
              view: {
                type: ObjectNameInput,
              },
            },
          },
        },
        outputMIME: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.reports_common.outputMIME.name',
                defaultMessage: 'Default output format',
              },
            }),
            view: {
              type: OptionPickerInput,
              props: {
                source: 'reportMimeTypes',
              },
            },
          },
        },
      },
    },
  };
};
