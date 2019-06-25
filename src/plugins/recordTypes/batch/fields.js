import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    CheckboxInput,
    TextInput,
    CompoundInput,
    ObjectNameInput,
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
            defaultChildSubpath: 'ns2:batch_common',
          },
        },
      },
      'ns2:batch_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/batch',
          },
          view: {
            type: CompoundInput,
          },
        },
        name: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.batch_common.name.name',
                defaultMessage: 'Name',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        className: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.batch_common.className.name',
                defaultMessage: 'Java class',
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
                id: 'field.batch_common.notes.name',
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
                id: 'field.batch_common.supportsNoContext.name',
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
                id: 'field.batch_common.supportsGroup.name',
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
                id: 'field.batch_common.supportsDocList.name',
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
                id: 'field.batch_common.supportsSingleDoc.name',
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
                  id: 'field.batch_common.forDocType.name',
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
        createsNewFocus: {
          [config]: {
            dataType: DATA_TYPE_BOOL,
            messages: defineMessages({
              name: {
                id: 'field.batch_common.createsNewFocus.name',
                defaultMessage: 'Navigate to new record when complete',
              },
            }),
            view: {
              type: CheckboxInput,
            },
          },
        },
      },
    },
  };
};
