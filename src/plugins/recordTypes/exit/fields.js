import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    AutocompleteInput,
    CompoundInput,
    DateInput,
    IDGeneratorInput,
    StructuredDateInput,
    TermPickerInput,
    TextInput,
  } = configContext.inputComponents;

  const {
    configKey: config,
  } = configContext.configHelpers;

  const {
    DATA_TYPE_DATE,
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
            defaultChildSubpath: 'ns2:exits_common',
          },
        },
      },
      ...extensions.core.fields,
      'ns2:exits_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/exit',
          },
        },
        exitNumber: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              inUse: {
                id: 'field.exits_common.exitNumber.inUse',
                defaultMessage: 'The exit number {value} is in use by another record.',
              },
              name: {
                id: 'field.exits_common.exitNumber.name',
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
              fieldName: 'exits_common:exitNumber',
            }),
            view: {
              type: IDGeneratorInput,
              props: {
                source: 'exit',
              },
            },
          },
        },
        exitCountNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.exits_common.exitCountNote.name',
                defaultMessage: 'Exit count note',
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
        exitDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              name: {
                id: 'field.exits_common.exitDate.name',
                defaultMessage: 'Exit date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        reason: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.exits_common.reason.name',
                defaultMessage: 'Exit reason',
              },
            }),
            view: {
              type: TermPickerInput,
              props: {
                source: 'objexitreason',
              },
            },
          },
        },
        saleCurrency: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.exits_common.saleCurrency.name',
                defaultMessage: 'Sale/auction currency',
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
        saleValue: {
          [config]: {
            dataType: DATA_TYPE_INT,
            messages: defineMessages({
              name: {
                id: 'field.exits_common.saleValue.name',
                defaultMessage: 'Sale/auction value',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        saleDate: {
          [config]: {
            dataType: DATA_TYPE_STRUCTURED_DATE,
            messages: defineMessages({
              name: {
                id: 'field.exits_common.saleDate.name',
                defaultMessage: 'Sale/auction date',
              },
            }),
            view: {
              type: StructuredDateInput,
            },
          },
          ...extensions.structuredDate.fields,
        },
        saleNumber: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.exits_common.saleNumber.name',
                defaultMessage: 'Sale/auction number',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        saleLot: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.exits_common.saleLot.name',
                defaultMessage: 'Sale/auction lot',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        saleNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.exits_common.saleNote.name',
                defaultMessage: 'Sale/auction note',
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
        owners: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          owner: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.exits_common.owner.name',
                  defaultMessage: 'Owner after exit',
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
        methods: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          method: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.exits_common.method.name',
                  defaultMessage: 'Exit method',
                },
              }),
              repeating: true,
              view: {
                type: TermPickerInput,
                props: {
                  source: 'objexitmethod',
                },
              },
            },
          },
        },
        exitAgentGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          exitAgentGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.exits_common.exitAgentGroup.name',
                  defaultMessage: 'Exit agent',
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
            agent: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.exits_common.agent.fullName',
                    defaultMessage: 'Exit agent name',
                  },
                  name: {
                    id: 'field.exits_common.agent.name',
                    defaultMessage: 'Name',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'person/local,organization/local',
                  },
                },
              },
            },
            role: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.exits_common.role.fullName',
                    defaultMessage: 'Exit agent role',
                  },
                  name: {
                    id: 'field.exits_common.role.name',
                    defaultMessage: 'Role',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'objexitagentrole',
                  },
                },
              },
            },
          },
        },
        approvalStatusGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          approvalStatusGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.exits_common.approvalStatusGroup.name',
                  defaultMessage: 'Approval status',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
                props: {
                  tabular: false,
                },
              },
            },
            group: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.exits_common.group.fullName',
                    defaultMessage: 'Approval status group',
                  },
                  name: {
                    id: 'field.exits_common.group.name',
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
            individual: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.exits_common.individual.fullName',
                    defaultMessage: 'Approval status individual',
                  },
                  name: {
                    id: 'field.exits_common.individual.name',
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
            status: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.exits_common.status.fullName',
                    defaultMessage: 'Approval status',
                  },
                  name: {
                    id: 'field.exits_common.status.name',
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
            date: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.exits_common.date.fullName',
                    defaultMessage: 'Approval status date',
                  },
                  name: {
                    id: 'field.exits_common.date.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            approvalStatusNotes: {
              [config]: {
                view: {
                  type: CompoundInput,
                },
              },
              approvalStatusNote: {
                [config]: {
                  messages: defineMessages({
                    fullName: {
                      id: 'field.exits_common.approvalStatusNote.fullName',
                      defaultMessage: 'Approval status note',
                    },
                    name: {
                      id: 'field.exits_common.approvalStatusNote.name',
                      defaultMessage: 'Note',
                    },
                  }),
                  repeating: true,
                  view: {
                    type: TextInput,
                    props: {
                      height: 46,
                      multiline: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };
};
