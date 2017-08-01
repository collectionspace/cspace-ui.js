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
    // URLInput,
  } = pluginContext.inputComponents;

  const {
    configKey: config,
  } = pluginContext.configHelpers;

  const {
    DATA_TYPE_DATETIME,
    DATA_TYPE_FLOAT,
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
            ns: 'http://collectionspace.org/services/pottags',
          },
        },
        taxonName: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.pottags_common.taxonName.name',
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
            messages: defineMessages({
              name: {
                id: 'field.objectexit_common.exitMethods.name',
                defaultMessage: 'Exit methods',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          exitMethod: {
            [config]: {
              repeating: true,
              messages: defineMessages({
                name: {
                  id: 'field.objectexit_common.exitMethod.name',
                  defaultMessage: 'Exit method',
                },
              }),
              view: {
                type: OptionPickerInput,
                props: {
                  source: 'exitMethod',
                },
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
                source: 'exitReason',
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
            messages: defineMessages({
              name: {
                id: 'field.objectexit_common.deacApprovalGroupList.name',
                defaultMessage: 'Deaccession approval group',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          deacApprovalGroup: {
            [config]: {
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
                  name: {
                    id: 'field.objectexit_common.deaccessionApprovalGroup.name',
                    defaultMessage: 'Deaccession approval group',
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
                  name: {
                    id: 'field.objectexit_common.deaccessionApprovalStatus.name',
                    defaultMessage: 'Deaccession approval status',
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
                  name: {
                    id: 'field.objectexit_common.deaccessionApprovalDate.name',
                    defaultMessage: 'Deaccession approval date',
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
              name: {
                id: 'field.objectexit_common.disposalCurrency.name',
                defaultMessage: 'Disposal currency',
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
              name: {
                id: 'field.objectexit_common.groupDisposalCurrency.name',
                defaultMessage: 'Group disposal currency',
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
