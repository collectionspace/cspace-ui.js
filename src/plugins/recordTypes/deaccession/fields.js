import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    AutocompleteInput,
    CompoundInput,
    DateInput,
    IDGeneratorInput,
    TermPickerInput,
    TextInput,
  } = configContext.inputComponents;

  const {
    configKey: config,
  } = configContext.configHelpers;

  const {
    DATA_TYPE_DATE,
  } = configContext.dataTypes;

  const {
    extensions,
  } = configContext.config;

  const {
    validateNotInUse,
  } = configContext.validationHelpers;

  return {
    document: {
      [config]: {
        view: {
          type: CompoundInput,
          props: {
            defaultChildSubpath: 'ns2:deaccessions_common',
          },
        },
      },
      ...extensions.core.fields,
      'ns2:deaccessions_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/deaccession',
          },
        },
        deaccessionNumber: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              inUse: {
                id: 'field.deaccessions_common.deaccessionNumber.inUse',
                defaultMessage: 'The identification number {value} is in use by another record.',
              },
              name: {
                id: 'field.deaccessions_common.deaccessionNumber.name',
                defaultMessage: 'Deaccession number',
              },
            }),
            required: true,
            searchView: {
              type: TextInput,
            },
            validate: (validationContext) => validateNotInUse({
              configContext,
              validationContext,
              fieldName: 'deaccessions_common:deaccessionNumber',
            }),
            view: {
              type: IDGeneratorInput,
              props: {
                source: 'deaccession',
              },
            },
          },
        },
        deaccessionReasons: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          deaccessionReason: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.deaccessions_common.deaccessionReason.name',
                  defaultMessage: 'Deaccession reason',
                },
              }),
              repeating: true,
              view: {
                type: TermPickerInput,
                props: {
                  source: 'deaccessionreason',
                },
              },
            },
          },
        },
        deaccessionDate: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.deaccessions_common.deaccessionDate.name',
                defaultMessage: 'Deaccession date',
              },
            }),
            dataType: DATA_TYPE_DATE,
            view: {
              type: DateInput,
            },
          },
        },
        deaccessionRationale: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.deaccessions_common.deaccessionRationale.name',
                defaultMessage: 'Deaccession rationale',
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
        deaccessionNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.deaccessions_common.deaccessionNote.name',
                defaultMessage: 'Deaccession note',
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
        deaccessionApprovalGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          deaccessionApprovalGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.deaccessions_common.deaccessionApprovalGroup.name',
                  defaultMessage: 'Deaccession approval',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            deaccessionApprovalGroup: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.deaccessions_common.deaccessionApprovalGroup.deaccessionApprovalGroup.fullName',
                    defaultMessage: 'Deaccession approval group',
                  },
                  name: {
                    id: 'field.deaccessions_common.deaccessionApprovalGroup.deaccessionApprovalGroup.name',
                    defaultMessage: 'Group',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'deaccessionapprovalgroup',
                  },
                },
              },
            },
            deaccessionApprovalIndividual: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.deaccessions_common.deaccessionApprovalIndividual.fullName',
                    defaultMessage: 'Deaccession approval individual',
                  },
                  name: {
                    id: 'field.deaccessions_common.deaccessionApprovalIndividual.name',
                    defaultMessage: 'Individual',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'person/local',
                  },
                },
              },
            },
            deaccessionApprovalStatus: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.deaccessions_common.deaccessionApprovalStatus.fullName',
                    defaultMessage: 'Deaccession approval status',
                  },
                  name: {
                    id: 'field.deaccessions_common.deaccessionApprovalStatus.name',
                    defaultMessage: 'Status',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'deaccessionapprovalstatus',
                  },
                },
              },
            },
            deaccessionApprovalDate: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.deaccessions_common.deaccessionApprovalDate.fullName',
                    defaultMessage: 'Deaccession approval date',
                  },
                  name: {
                    id: 'field.deaccessions_common.deaccessionApprovalDate.name',
                    defaultMessage: 'Date',
                  },
                }),
                dataType: DATA_TYPE_DATE,
                view: {
                  type: DateInput,
                },
              },
            },
            deaccessionApprovalNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.deaccessions_common.deaccessionApprovalNote.fullName',
                    defaultMessage: 'Deaccession approval note',
                  },
                  name: {
                    id: 'field.deaccessions_common.deaccessionApprovalNote.name',
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
        exitDate: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.deaccessions_common.exitDate.name',
                defaultMessage: 'Exit date',
              },
            }),
            dataType: DATA_TYPE_DATE,
            view: {
              type: DateInput,
            },
          },
        },
        exitRecipients: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          exitRecipient: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.deaccessions_common.exitRecipient.name',
                  defaultMessage: 'Exit recipient',
                },
              }),
              repeating: true,
              view: {
                type: AutocompleteInput,
                props: {
                  source: 'person/local,organization/local',
                },
              },
            },
          },
        },
        exitMethods: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          exitMethod: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.deaccessions_common.exitMethod.name',
                  defaultMessage: 'Exit method',
                },
              }),
              repeating: true,
              view: {
                type: TermPickerInput,
                props: {
                  source: 'disposalmethod',
                },
              },
            },
          },
        },
      },
    },
  };
};
