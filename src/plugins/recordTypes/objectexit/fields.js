import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    CompoundInput,
    DateInput,
    OptionPickerInput,
    TextInput,
    AutocompleteInput,
    IDGeneratorInput,
    TermPickerInput,
    StructuredDateInput,
  } = configContext.inputComponents;

  const {
    configKey: config,
  } = configContext.configHelpers;

  const {
    DATA_TYPE_DATE,
    DATA_TYPE_FLOAT,
    DATA_TYPE_INT,
    DATA_TYPE_STRUCTURED_DATE,
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
            defaultChildSubpath: 'ns2:objectexit_common',
          },
        },
      },
      ...extensions.core.fields,
      'ns2:objectexit_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/objectexit',
          },
        },
        exitNumber: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              inUse: {
                id: 'field.objectexit_common.exitNumber.inUse',
                defaultMessage: 'The exit number {value} is in use by another record.',
              },
              name: {
                id: 'field.objectexit_common.exitNumber.name',
                defaultMessage: 'Exit number',
              },
            }),
            required: true,
            searchView: {
              type: TextInput,
            },
            validate: (validationContext) => validateNotInUse({
              configContext,
              validationContext,
              fieldName: 'objectexit_common:exitNumber',
            }),
            view: {
              type: IDGeneratorInput,
              props: {
                source: 'objectexit',
              },
            },
          },
        },
        exitDateGroup: {
          [config]: {
            dataType: DATA_TYPE_STRUCTURED_DATE,
            messages: defineMessages({
              name: {
                id: 'field.objectexit_common.exitDateGroup.name',
                defaultMessage: 'Exit date',
              },
            }),
            view: {
              type: StructuredDateInput,
            },
          },
          ...extensions.structuredDate.fields,
        },
        exitReason: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.objectexit_common.exitReason.name',
                defaultMessage: 'Exit reason',
              },
            }),
            view: {
              type: OptionPickerInput,
              props: {
                source: 'exitReasons',
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
                  id: 'field.objectexit_common.exitMethod.name',
                  defaultMessage: 'Exit method',
                },
              }),
              repeating: true,
              view: {
                type: OptionPickerInput,
                props: {
                  source: 'exitMethods',
                },
              },
            },
          },
        },
        exitQuantity: {
          [config]: {
            dataType: DATA_TYPE_INT,
            messages: defineMessages({
              name: {
                id: 'field.objectexit_common.exitQuantity.name',
                defaultMessage: 'Exit quantity',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        currentOwner: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.objectexit_common.currentOwner.name',
                defaultMessage: 'Current owner',
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
        depositor: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.objectexit_common.depositor.name',
                defaultMessage: 'Depositor',
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
        exitNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.objectexit_common.exitNote.name',
                defaultMessage: 'Exit note',
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
        packingNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.objectexit_common.packingNote.name',
                defaultMessage: 'Packing note',
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
        displosalNewObjectNumber: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.objectexit_common.displosalNewObjectNumber.name',
                defaultMessage: 'Disposal new object number',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        deaccessionAuthorizer: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.objectexit_common.deaccessionAuthorizer.name',
                defaultMessage: 'Deaccession authorizer',
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
        authorizationDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              name: {
                id: 'field.objectexit_common.authorizationDate.name',
                defaultMessage: 'Authorization date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        deacApprovalGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          deacApprovalGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.objectexit_common.deacApprovalGroup.name',
                  defaultMessage: 'Deaccession approval',
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
            deaccessionApprovalGroup: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.objectexit_common.deaccessionApprovalGroup.fullName',
                    defaultMessage: 'Deaccession approval group',
                  },
                  name: {
                    id: 'field.objectexit_common.deaccessionApprovalGroup.name',
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
                    id: 'field.objectexit_common.deaccessionApprovalIndividual.fullName',
                    defaultMessage: 'Deaccession approval individual',
                  },
                  name: {
                    id: 'field.objectexit_common.deaccessionApprovalIndividual.name',
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
                    id: 'field.objectexit_common.deaccessionApprovalStatus.fullName',
                    defaultMessage: 'Deaccession approval status',
                  },
                  name: {
                    id: 'field.objectexit_common.deaccessionApprovalStatus.name',
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
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.objectexit_common.deaccessionApprovalDate.fullName',
                    defaultMessage: 'Deaccession approval status date',
                  },
                  name: {
                    id: 'field.objectexit_common.deaccessionApprovalDate.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            deaccessionApprovalNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.objectexit_common.deaccessionApprovalNote.fullName',
                    defaultMessage: 'Deaccession approval note',
                  },
                  name: {
                    id: 'field.objectexit_common.deaccessionApprovalNote.name',
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
        deaccessionDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              name: {
                id: 'field.objectexit_common.deaccessionDate.name',
                defaultMessage: 'Deaccession date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        disposalDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              name: {
                id: 'field.objectexit_common.disposalDate.name',
                defaultMessage: 'Disposal date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        disposalMethod: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.objectexit_common.disposalMethod.name',
                defaultMessage: 'Disposal method',
              },
            }),
            view: {
              type: TermPickerInput,
              props: {
                source: 'disposalmethod',
              },
            },
          },
        },
        displosalReason: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.objectexit_common.displosalReason.name',
                defaultMessage: 'Disposal reason',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        disposalProposedRecipient: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.objectexit_common.disposalProposedRecipient.name',
                defaultMessage: 'Disposal proposed recipient',
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
        disposalRecipient: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.objectexit_common.disposalRecipient.name',
                defaultMessage: 'Disposal recipient',
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
        disposalCurrency: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.objectexit_common.disposalCurrency.fullName',
                defaultMessage: 'Disposal currency',
              },
              name: {
                id: 'field.objectexit_common.disposalCurrency.name',
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
        displosalValue: {
          [config]: {
            dataType: DATA_TYPE_FLOAT,
            messages: defineMessages({
              name: {
                id: 'field.objectexit_common.displosalValue.name',
                defaultMessage: 'Value',
              },
              fullName: {
                id: 'field.objectexit_common.displosalValue.fullName',
                defaultMessage: 'Disposal value',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        groupDisposalCurrency: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.objectexit_common.groupDisposalCurrency.fullName',
                defaultMessage: 'Group disposal currency',
              },
              name: {
                id: 'field.objectexit_common.groupDisposalCurrency.name',
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
        groupDisplosalValue: {
          [config]: {
            dataType: DATA_TYPE_FLOAT,
            messages: defineMessages({
              name: {
                id: 'field.objectexit_common.groupDisplosalValue.name',
                defaultMessage: 'Value',
              },
              fullName: {
                id: 'field.objectexit_common.groupDisposalValue.fullName',
                defaultMessage: 'Group disposal value',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        displosalProvisos: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.objectexit_common.displosalProvisos.name',
                defaultMessage: 'Disposal provisos',
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
        displosalNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.objectexit_common.displosalNote.name',
                defaultMessage: 'Disposal note',
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
