import { defineMessages } from 'react-intl';

export default (pluginContext) => {
  const {
    CompoundInput,
    DateInput,
    OptionPickerInput,
    TextInput,
    AutocompleteInput,
    IDGeneratorInput,
    TermPickerInput,
    StructuredDateInput,
  } = pluginContext.inputComponents;

  const {
    configKey: config,
  } = pluginContext.configHelpers;

  const {
    DATA_TYPE_DATE,
    DATA_TYPE_FLOAT,
    DATA_TYPE_INT,
  } = pluginContext.dataTypes;

  const {
    extensions,
  } = pluginContext.config;

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
              name: {
                id: 'field.objectexit_common.exitNumber.name',
                defaultMessage: 'Exit number',
              },
            }),
            required: true,
            searchView: {
              type: TextInput,
            },
            view: {
              type: IDGeneratorInput,
              props: {
                idGeneratorName: 'objectexit',
              },
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
        exitDateGroup: {
          [config]: {
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
        exitNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.objectexit_common.exitNote.name',
                defaultMessage: 'Exit note',
              },
            }),
            searchView: {
              type: TextInput,
            },
            view: {
              type: TextInput,
              props: {
                multiline: true,
              },
            },
          },
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
        disposalNewObjectNumber: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.objectexit_common.disposalNewObjectNumber.name',
                defaultMessage: 'Disposal new object number',
              },
            }),
            view: {
              type: TextInput,
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
                  id: 'field.objectexit_common.deacApprovalGroupList.name',
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
                  name: {
                    id: 'field.objectexit_common.deaccessionApprovalDate.name',
                    defaultMessage: 'Date',
                  },
                  fullName: {
                    id: 'field.objectexit_common.deaccessionApprovalDate.fullName',
                    defaultMessage: 'Deaccession approval status date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
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
        disposalReason: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.objectexit_common.disposalReason.name',
                defaultMessage: 'Disposal reason',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        disposalProvisos: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.objectexit_common.disposalProvisos.name',
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
        disposalNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.objectexit_common.disposalNote.name',
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
        disposalValue: {
          [config]: {
            dataType: DATA_TYPE_FLOAT,
            messages: defineMessages({
              name: {
                id: 'field.objectexit_common.disposalValue.name',
                defaultMessage: 'Value',
              },
              fullName: {
                id: 'field.objectexit_common.disposalValue.fullName',
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
        groupDisposalValue: {
          [config]: {
            dataType: DATA_TYPE_FLOAT,
            messages: defineMessages({
              name: {
                id: 'field.objectexit_common.groupDisposalValue.name',
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
      },
    },
  };
}
;
