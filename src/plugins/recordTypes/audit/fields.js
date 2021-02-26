import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    AutocompleteInput,
    CompoundInput,
    OptionPickerInput,
    TextInput,
    TermPickerInput,
  } = configContext.inputComponents;

  const {
    configKey: config,
  } = configContext.configHelpers;

  const {
    extensions,
  } = configContext.config;

  return {
    document: {
      [config]: {
        view: {
          type: CompoundInput,
          props: {
            defaultChildSubpath: 'ns2:audit_common', // FIX ME: audit vs audit?
          },
        },
      },
      ...extensions.core.fields,
      'ns2:audit_common': {
        [config]: {
          service: {
            ns: 'XYZ' // TO DO: hook up  to  the backend
          },
        },
        idNumber: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.audit_common.idNumber.name',
                defaultMessage: 'Identification number',
              },
            }),
            view: {
              type: TextInput, // FIX ME: Generator
            },
          },
        },
        recordType: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.audit_common.recordType.name',
                defaultMessage: 'Record type',
              },
            }),
            view: {
              type: TextInput, // FIX ME: add list of record types
            },
          },
        },
        recordId: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.audit_common.recordId.name',
                defaultMessage: 'Record identification number',
              },
            }),
            view: {
              type: TextInput
            },
          },
        },
        fieldChangedGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          fieldChangedGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.audit_common.fieldChangedGroup.name',
                  defaultMessage: 'Field changed'
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            fieldName: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.audit_common.fieldName.fullName',
                    defaultMessage: 'Field changed name',
                  },
                  name: {
                    id: 'field.audit_common.fieldName.name',
                    defaultMessage: 'Field',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            originalValue: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.audit_common.originalValue.fullName',
                    defaultMessage: 'Field changed original value',
                  },
                  name: {
                    id: 'field.audit_common.originalValue.name',
                    defaultMessage: 'Original value',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            newValue: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.audit_common.newValue.fullName',
                    defaultMessage: 'Field changed new value',
                  },
                  name: {
                    id: 'field.audit_common.newValue.name',
                    defaultMessage: 'New value',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            changeReason: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.audit_common.changeReason.fullName',
                    defaultMessage: 'Field change reason',
                  },
                  name: {
                    id: 'field.audit_common.changeReason.name',
                    defaultMessage: 'Reason for change',
                    // TO DO: Fix awk wording?
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        relationshipGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          relationshipGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.audit_common.relationshipGroup.name',
                  defaultMessage: 'Relationship changed',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            relPredicate: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.audit_common.relPredicate.fullName',
                    defaultMessage: 'Relationship change predicate',
                  },
                  name: {
                    id: 'field.audit_common.relPredicate.name',
                    defaultMessage: 'Predicate',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            relObjRecordType: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.audit_common.relObjRecordType.fullName',
                    defaultMessage: 'Relationship object record type',
                  },
                  name: {
                    id: 'field.audit_common.relObjRecordType.name',
                    defaultMessage: 'Object record type',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            relObjectTitle: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.audit_common.relObjectTitle.fullName',
                    defaultMessage: 'Relationship object title/summary',
                  },
                  name: {
                    id: 'field.audit_common.relObjectTitle.name',
                    defaultMessage: 'Title/summary',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            relChange: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.audit_common.relChange.fullName',
                    defaultMessage: 'Relationship change',
                  },
                  name: {
                    id: 'field.audit_common.relChange.name',
                    defaultMessage: 'Change',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        relRecordChecksumList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          relRecordChecksum: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.audit_common.relRecordChecksum.name',
                  defaultMessage: 'Related blob checksum',
                },
              }),
              view: {
                type: TextInput,
              },
            },
          },
        },
        saveMessage: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.audit_common.saveMessage.name',
                defaultMessage: 'Save  message',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        updatedBy: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.audit_common.updatedBy.name',
                defaultMessage: 'Updated by',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        updatedAt: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.audit_common.updatedAt.name',
                defaultMessage: 'Updated at',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        recordChecksum: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.audit_common.recordChecksum.name',
                defaultMessage: 'Record checksum',
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
