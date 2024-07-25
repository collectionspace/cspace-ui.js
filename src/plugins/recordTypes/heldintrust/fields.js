import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    CompoundInput,
    DateInput,
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

  const {
    validateNotInUse,
  } = configContext.validationHelpers;

  return {
    document: {
      [config]: {
        view: {
          type: CompoundInput,
          props: {
            defaultChildSubpath: 'ns2:heldintrusts_common',
          },
        },
      },
      ...extensions.core.fields,
      'ns2:heldintrusts_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/heldintrust',
          },
        },
        heldInTrustNumber: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              inUse: {
                id: 'field.heldintrusts_common.heldInTrustNumber.inUse',
                defaultMessage: 'The Held-in-Trust number {value} is in use by another record.',
              },
              name: {
                id: 'field.heldintrusts_common.heldInTrustNumber.name',
                defaultMessage: 'Held-in-Trust number',
              },
            }),
            required: true,
            searchView: {
              type: TextInput,
            },
            validate: (validationContext) => validateNotInUse({
              configContext,
              validationContext,
              fieldName: 'heldintrusts_common:heldInTrustNumber',
            }),
            view: {
              type: IDGeneratorInput,
              props: {
                source: 'heldintrust',
              },
            },
          },
        },
        typeOfAgreement: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.heldintrusts_common.typeOfAgreement.name',
                defaultMessage: 'Type of agreement',
              },
            }),
            view: {
              type: TermPickerInput,
              props: {
                source: 'heldintrusttype',
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
                  id: 'field.heldintrusts_common.owner.name',
                  defaultMessage: 'Owner',
                },
              }),
              repeating: true,
              view: {
                type: AutocompleteInput,
                props: {
                  source: 'person/local',
                },
              },
            },
          },
        },
        plannedReturnGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          plannedReturnGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.heldintrusts_common.plannedReturnGroup.name',
                  defaultMessage: 'Planned return',
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
            plannedReturnDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.heldintrusts_common.plannedReturnDate.fullName',
                    defaultMessage: 'Planned return date',
                  },
                  name: {
                    id: 'field.heldintrusts_common.plannedReturnDate.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            plannedReturnNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.heldintrusts_common.plannedReturnNote.fullName',
                    defaultMessage: 'Planned return note',
                  },
                  name: {
                    id: 'field.heldintrusts_common.plannedReturnNote.name',
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
        agreementDescriptions: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          agreementDescription: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.heldintrusts_common.agreementDescription.name',
                  defaultMessage: 'Description of agreement',
                },
              }),
              repeating: true,
              view: {
                type: TextInput,
                props: {
                  multiline: true,
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
                  id: 'field.heldintrusts_common.agreementRenewalDate.name',
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
        agreementApprovalGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          agreementApprovalGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.heldintrusts_common.agreementApprovalGroup.name',
                  defaultMessage: 'Held-in-Trust status',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            agreementGroup: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.heldintrusts_common.agreementGroup.fullName',
                    defaultMessage: 'Held-in-Trust status group',
                  },
                  name: {
                    id: 'field.heldintrusts_common.agreementGroup.name',
                    defaultMessage: 'Group',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            agreementIndividual: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.heldintrusts_common.agreementIndividual.fullName',
                    defaultMessage: 'Held-in-Trust status individual',
                  },
                  name: {
                    id: 'field.heldintrusts_common.agreementIndividual.name',
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
            agreementStatus: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.heldintrusts_common.agreementStatus.fullName',
                    defaultMessage: 'Held-in-Trust status',
                  },
                  name: {
                    id: 'field.heldintrusts_common.agreementStatus.name',
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
            agreementDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.heldintrusts_common.agreementDate.fullName',
                    defaultMessage: 'Held-in-Trust status date',
                  },
                  name: {
                    id: 'field.heldintrusts_common.agreementDate.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            agreementNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.heldintrusts_common.agreementNote.fullName',
                    defaultMessage: 'Held-in-Trust status note',
                  },
                  name: {
                    id: 'field.heldintrusts_common.agreementNote.name',
                    defaultMessage: 'Note',
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
                  id: 'field.heldintrusts_common.correspondenceGroup.name',
                  defaultMessage: 'Correspondence',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            correspondenceDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.heldintrusts_common.correspondenceDate.fullName',
                    defaultMessage: 'Correspondence date',
                  },
                  name: {
                    id: 'field.heldintrusts_common.correspondenceDate.name',
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
                    id: 'field.heldintrusts_common.correspondenceSender.fullName',
                    defaultMessage: 'Correspondence sender',
                  },
                  name: {
                    id: 'field.heldintrusts_common.correspondenceSender.name',
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
                    id: 'field.heldintrusts_common.correspondenceRecipient.fullName',
                    defaultMessage: 'Correspondence recipient',
                  },
                  name: {
                    id: 'field.heldintrusts_common.correspondenceRecipient.name',
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
                    id: 'field.heldintrusts_common.correspondenceSummary.fullName',
                    defaultMessage: 'Correspondence summary',
                  },
                  name: {
                    id: 'field.heldintrusts_common.correspondenceSummary.name',
                    defaultMessage: 'Summary',
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
            correspondenceType: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.heldintrusts_common.correspondenceType.fullName',
                    defaultMessage: 'Correspondence type',
                  },
                  name: {
                    id: 'field.heldintrusts_common.correspondenceType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'correspondencetype',
                  },
                },
              },
            },
          },
        },
        culturalCareNotes: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          culturalCareNote: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.heldintrusts_common.culturalCareNote.name',
                  defaultMessage: 'Cultural care note',
                },
              }),
              repeating: true,
              view: {
                type: TextInput,
                props: {
                  multiline: true,
                },
              },
            },
          },
        },
        accessLimitationsGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          accessLimitationsGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.heldintrusts_common.accessLimitationsGroup.name',
                  defaultMessage: 'Access limitation',
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
            limitationType: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.heldintrusts_common.limitationType.fullName',
                    defaultMessage: 'Access limitation type',
                  },
                  name: {
                    id: 'field.heldintrusts_common.limitationType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'limitationtype',
                  },
                },
              },
            },
            limitationLevel: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.heldintrusts_common.limitationLevel.fullName',
                    defaultMessage: 'Access limitation level',
                  },
                  name: {
                    id: 'field.heldintrusts_common.limitationLevel.name',
                    defaultMessage: 'Level',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'limitationlevel',
                  },
                },
              },
            },
            limitationDetails: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.heldintrusts_common.limitationDetails.fullName',
                    defaultMessage: 'Access limitation detail',
                  },
                  name: {
                    id: 'field.heldintrusts_common.limitationDetails.name',
                    defaultMessage: 'Detail',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            requester: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.heldintrusts_common.requester.fullName',
                    defaultMessage: 'Access limitation requestor',
                  },
                  name: {
                    id: 'field.heldintrusts_common.requester.name',
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
            requestOnBehalfOf: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.heldintrusts_common.requestOnBehalfOf.fullName',
                    defaultMessage: 'Access limitation requested on behalf of',
                  },
                  name: {
                    id: 'field.heldintrusts_common.requestOnBehalfOf.name',
                    defaultMessage: 'On behalf of',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'organization/local',
                  },
                },
              },
            },
            requestDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.heldintrusts_common.requestDate.fullName',
                    defaultMessage: 'Access limitation request date',
                  },
                  name: {
                    id: 'field.heldintrusts_common.requestDate.name',
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
      },
    },
  };
};
