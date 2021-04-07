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
                    defaultMessage: 'Depositor',
                  },
                  name: {
                    id: 'field.hits_common.depositor.name',
                    defaultMessage: 'Depositor',
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
                    defaultMessage: 'Depositor contact',
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
                    defaultMessage: 'Depositor note',
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
        agreementRenewalDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              name: {
                id: 'field.hits_common.agreementRenewalDate.name',
                defaultMessage: 'Agreement renewal date',
              },
            }),
            view: {
              type: DateInput,
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
            internalApprovalGroup: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.hits_common.internalApprovalGroup.fullName',
                    defaultMessage: 'Internal approval group',
                  },
                  name: {
                    id: 'field.hits_common.internalApprovalGroup.name',
                    defaultMessage: 'Internal approval group',
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
            internalApprovalIndividual: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.hits_common.internalApprovalIndividual.fullName',
                    defaultMessage: 'Internal approval individual',
                  },
                  name: {
                    id: 'field.hits_common.internalApprovalIndividual.name',
                    defaultMessage: 'Internal approval individual',
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
                    defaultMessage: 'Internal approval status',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'internalapprovaltypes',
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
                    defaultMessage: 'Internal approval date',
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
                    defaultMessage: 'Internal approval note',
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
            externalApprovalGroup: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.hits_common.externalApprovalGroup.fullName',
                    defaultMessage: 'External approval group',
                  },
                  name: {
                    id: 'field.hits_common.externalApprovalGroup.name',
                    defaultMessage: 'External approval group',
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
            externalApprovalIndividual: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.hits_common.externalApprovalIndividual.fullName',
                    defaultMessage: 'External approval individual',
                  },
                  name: {
                    id: 'field.hits_common.externalApprovalIndividual.name',
                    defaultMessage: 'External approval individual',
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
                    defaultMessage: 'External approval status',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'externalapprovaltypes',
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
                    defaultMessage: 'External approval date',
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
                    defaultMessage: 'External approval note',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        fieldCollectionDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              name: {
                id: 'field.hits_common.fieldCollectionDate.name',
                defaultMessage: 'Field collection date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        fieldCollectionMethods: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          fieldCollectionMethod: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.hits_common.fieldCollectionMethod.name',
                  defaultMessage: 'Field collection method',
                },
              }),
              repeating: true,
              view: {
                type: TermPickerInput,
                props: {
                  source: 'collectionmethod',
                },
              },
            },
          },
        },
        fieldCollectionNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.hits_common.fieldCollectionNote.name',
                defaultMessage: 'Field collection note',
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
        fieldCollectionNumber: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.hits_common.fieldCollectionNumber.name',
                defaultMessage: 'Field collection number',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        fieldCollectionPlace: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.hits_common.fieldCollectionPlace.name',
                defaultMessage: 'Field collection place',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        fieldCollectionSources: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          fieldCollectionSource: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.hits_common.fieldCollectionSource.name',
                  defaultMessage: 'Field collection source',
                },
              }),
              repeating: true,
              view: {
                type: AutocompleteInput,
                props: {
                  source: 'person/local,person/shared,concept/ethculture',
                },
              },
            },
          },
        },
        fieldCollectors: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          fieldCollector: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.hits_common.fieldCollector.name',
                  defaultMessage: 'Field collector',
                },
              }),
              repeating: true,
              view: {
                type: AutocompleteInput,
                props: {
                  source: 'person/local,person/shared,organization/local,organization/shared',
                },
              },
            },
          },
        },
        fieldCollectionEventNames: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          fieldCollectionEventName: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.hits_common.fieldCollectionEventName.name',
                  defaultMessage: 'Field collection event name',
                },
              }),
              repeating: true,
              view: {
                type: TextInput,
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
                    source: 'person/local',
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
                    source: 'person/local',
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
                    defaultMessage: 'Correspondence date',
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
                  type: TermPickerInput,
                  props: {
                    source: 'correspondencereferencetypes',
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
