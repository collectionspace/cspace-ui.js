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

  return {
    document: {
      [config]: {
        view: {
          type: CompoundInput,
          props: {
            defaultChildSubpath: 'ns2:hits_common',
          },
        },
      },
      ...extensions.core.fields,
      'ns2:hits_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/hit',
          },
        },
        hitNumber: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              name: {
                id: 'field.hits_common.hitNumber.name',
                defaultMessage: 'Held-in-Trust number',
              },
            }),
            required: true,
            searchView: {
              type: TextInput,
            },
            view: {
              type: IDGeneratorInput,
              props: {
                source: 'hit',
              },
            },
          },
        },
        entryDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              name: {
                id: 'field.hits_common.entryDate.name',
                defaultMessage: 'Object entry date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        hitDepositorGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          hitDepositorGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.hits_common.hitDepositorGroup.name',
                  defaultMessage: 'Depositor',
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
            depositor: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.hits_common.depositor.fullName',
                    defaultMessage: 'Depositor name',
                  },
                  name: {
                    id: 'field.hits_common.depositor.name',
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
            depositorContact: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.hits_common.depositorContact.fullName',
                    defaultMessage: 'Depositor contact',
                  },
                  name: {
                    id: 'field.hits_common.depositorContact.name',
                    defaultMessage: 'Contact',
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
            depositorContactType: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.hits_common.depositorContactType.fullName',
                    defaultMessage: 'Depositor Contact type',
                  },
                  name: {
                    id: 'field.hits_common.depositorContactType.name',
                    defaultMessage: 'Contact type',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'depositorcontacttypes',
                  },
                },
              },
            },
            depositorNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.hits_common.depositorNote.fullName',
                    defaultMessage: 'Depositor note',
                  },
                  name: {
                    id: 'field.hits_common.depositorNote.name',
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
        entryMethods: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          entryMethod: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.hits_common.entryMethod.name',
                  defaultMessage: 'Object entry method',
                },
              }),
              repeating: true,
              view: {
                type: TermPickerInput,
                props: {
                  source: 'entrymethod',
                },
              },
            },
          },
        },
        agreementGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          agreementGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.hits_common.agreementGroup.name',
                  defaultMessage: 'Agreement status',
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
            agreementStatus: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.hits_common.agreementStatus.fullName',
                    defaultMessage: 'Agreement status',
                  },
                  name: {
                    id: 'field.hits_common.agreementStatus.name',
                    defaultMessage: 'Status',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'agreementstatuses',
                  },
                },
              },
            },
            agreementStatusDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.hits_common.agreementStatusDate.fullName',
                    defaultMessage: 'Agreement status date',
                  },
                  name: {
                    id: 'field.hits_common.agreementStatusDate.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            agreementStatusNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.hits_common.agreementStatusNote.fullName',
                    defaultMessage: 'Agreement status note',
                  },
                  name: {
                    id: 'field.hits_common.agreementStatusNote.name',
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
        agreementRenewalDates: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          agreementRenewalDate: {
            [config]: {
              dataType: DATA_TYPE_DATE,
              messages: defineMessages({
                name: {
                  id: 'field.hits_common.agreementRenewalDate.name',
                  defaultMessage: 'Agreement renewal date',
                },
              }),
              repeating: true,
              view: {
                type: DateInput,
              },
            },
          },
        },
        entryReason: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.hits_common.entryReason.name',
                defaultMessage: 'Object entry reason',
              },
            }),
            view: {
              type: OptionPickerInput,
              props: {
                source: 'entryReasons',
              },
            },
          },
        },
        returnDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              name: {
                id: 'field.hits_common.returnDate.name',
                defaultMessage: 'Object return date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        entryNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.hits_common.entryNote.name',
                defaultMessage: 'Entry note',
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
        internalApprovalGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          internalApprovalGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.hits_common.hitInternalApprovalGroup.name',
                  defaultMessage: 'Internal approval',
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
            internalApprovalGroupName: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.hits_common.internalApprovalGroupName.fullName',
                    defaultMessage: 'Internal approval group',
                  },
                  name: {
                    id: 'field.hits_common.internalApprovalGroupName.name',
                    defaultMessage: 'Group',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'hitapprovalgroups',
                  },
                },
              },
            },
            internalApprovalIndividual: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.hits_common.internalApprovalIndividual.fullName',
                    defaultMessage: 'Internal approval individual',
                  },
                  name: {
                    id: 'field.hits_common.internalApprovalIndividual.name',
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
            internalApprovalStatus: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.hits_common.internalApprovalStatus.fullName',
                    defaultMessage: 'Internal approval status',
                  },
                  name: {
                    id: 'field.hits_common.internalApprovalStatus.name',
                    defaultMessage: 'Status',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'hitapprovaltypes',
                  },
                },
              },
            },
            internalApprovalDate: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.hits_common.internalApprovalDate.fullName',
                    defaultMessage: 'Internal approval date',
                  },
                  name: {
                    id: 'field.hits_common.internalApprovalDate.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            internalApprovalNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.hits_common.internalApprovalNote.fullName',
                    defaultMessage: 'Internal approval note',
                  },
                  name: {
                    id: 'field.hits_common.internalApprovalNote.name',
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
        externalApprovalGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          externalApprovalGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.hits_common.hitExternalApprovalGroup.name',
                  defaultMessage: 'External approval',
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
            externalApprovalGroupName: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.hits_common.externalApprovalGroupName.fullName',
                    defaultMessage: 'External approval group',
                  },
                  name: {
                    id: 'field.hits_common.externalApprovalGroupName.name',
                    defaultMessage: 'Group',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'hitapprovalgroups',
                  },
                },
              },
            },
            externalApprovalIndividual: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.hits_common.externalApprovalIndividual.fullName',
                    defaultMessage: 'External approval individual',
                  },
                  name: {
                    id: 'field.hits_common.externalApprovalIndividual.name',
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
            externalApprovalStatus: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.hits_common.externalApprovalStatus.fullName',
                    defaultMessage: 'External approval status',
                  },
                  name: {
                    id: 'field.hits_common.externalApprovalStatus.name',
                    defaultMessage: 'Status',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'hitapprovaltypes',
                  },
                },
              },
            },
            externalApprovalDate: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.hits_common.externalApprovalDate.fullName',
                    defaultMessage: 'External approval date',
                  },
                  name: {
                    id: 'field.hits_common.externalApprovalDate.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            externalApprovalNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.hits_common.externalApprovalNote.fullName',
                    defaultMessage: 'External approval note',
                  },
                  name: {
                    id: 'field.hits_common.externalApprovalNote.name',
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
        handlingPreferences: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.hits_common.handlingPreferences.name',
                defaultMessage: 'Handling preferences',
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
        handlingLimitationsGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          handlingLimitationsGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.hits_common.handlingLimitationsGroup.name',
                  defaultMessage: 'Handling limitations',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            handlingLimitationsType: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.hits_common.handlingLimitationsType.fullName',
                    defaultMessage: 'Handling limitations type',
                  },
                  name: {
                    id: 'field.hits_common.handlingLimitationsType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'handlinglimitationstypes',
                  },
                },
              },
            },
            handlingLimitationsRequestor: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.hits_common.handlingLimitationsRequestor.fullName',
                    defaultMessage: 'Handling limitations requestor',
                  },
                  name: {
                    id: 'field.hits_common.handlingLimitationsRequestor.name',
                    defaultMessage: 'Requestor',
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
            handlingLimitationsLevel: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.hits_common.handlingLimitationsLevel.fullName',
                    defaultMessage: 'Handling limitations level',
                  },
                  name: {
                    id: 'field.hits_common.handlingLimitationsLevel.name',
                    defaultMessage: 'Level',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'handlinglimitationslevels',
                  },
                },
              },
            },
            handlingLimitationsOnBehalfOf: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.hits_common.handlingLimitationsOnBehalfOf.fullName',
                    defaultMessage: 'On behalf of',
                  },
                  name: {
                    id: 'field.hits_common.handlingLimitationsOnBehalfOf.name',
                    defaultMessage: 'On behalf of',
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
            handlingLimitationsDetail: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.hits_common.handlingLimitationsDetail.fullName',
                    defaultMessage: 'Handling limitations detail',
                  },
                  name: {
                    id: 'field.hits_common.handlingLimitationsDetail.name',
                    defaultMessage: 'Detail',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            handlingLimitationsDate: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.hits_common.handlingLimitationsDate.fullName',
                    defaultMessage: 'handlingLimitationsDate',
                  },
                  name: {
                    id: 'field.hits_common.handlingLimitationsDate.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
          },
        },
        correspondenceGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          correspondenceGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.hits_common.correspondenceGroup.name',
                  defaultMessage: 'Correspondence',
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
            correspondenceDate: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.hits_common.correspondenceDate.fullName',
                    defaultMessage: 'Correspondence date',
                  },
                  name: {
                    id: 'field.hits_common.correspondenceDate.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            correspondenceSender: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.hits_common.correspondenceSender.fullName',
                    defaultMessage: 'Correspondence sender',
                  },
                  name: {
                    id: 'field.hits_common.correspondenceSender.name',
                    defaultMessage: 'Sender',
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
            correspondenceRecipient: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.hits_common.correspondenceRecipient.fullName',
                    defaultMessage: 'Correspondence recipient',
                  },
                  name: {
                    id: 'field.hits_common.correspondenceRecipient.name',
                    defaultMessage: 'Recipient',
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
            correspondenceSummary: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.hits_common.correspondenceSummary.fullName',
                    defaultMessage: 'Correspondence summary',
                  },
                  name: {
                    id: 'field.hits_common.correspondenceSummary.name',
                    defaultMessage: 'Summary',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            correspondenceReference: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.hits_common.correspondenceReference.fullName',
                    defaultMessage: 'Correspondence Reference',
                  },
                  name: {
                    id: 'field.hits_common.correspondenceReference.name',
                    defaultMessage: 'Reference',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
      },
    },
  };
};
