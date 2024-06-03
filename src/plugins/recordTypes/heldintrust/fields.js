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
              name: {
                id: 'field.heldintrusts_common.heldInTrustNumber.name',
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
              type: AutocompleteInput,
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
                  source: 'person/local,person/ulan',
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
                  defaultMessage: 'Agreement approval',
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
                    defaultMessage: 'Agreement approval group',
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
                    defaultMessage: 'Agreement approval individual',
                  },
                  name: {
                    id: 'field.heldintrusts_common.agreementIndividual.name',
                    defaultMessage: 'Individual',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'person/local,person/ulan',
                  },
                },
              },
            },
            agreementStatus: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.heldintrusts_common.agreementStatus.fullName',
                    defaultMessage: 'Agreement approval status',
                  },
                  name: {
                    id: 'field.heldintrusts_common.agreementStatus.name',
                    defaultMessage: 'Status',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'heldintruststatus',
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
                    defaultMessage: 'Agreement approval date',
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
                    defaultMessage: 'Agreement approval note',
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
                    source: 'person/local,person/ulan,organization/local,organization/ulan',
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
                    source: 'person/local,person/ulan,organization/local,organization/ulan',
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
      },
    },
  };
};
