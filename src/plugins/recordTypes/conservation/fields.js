import { defineMessages } from 'react-intl';
import getCoreFields from '../../../helpers/coreFields';

export default (pluginContext) => {
  const {
    AutocompleteInput,
    CheckboxInput,
    CompoundInput,
    DateInput,
    IDGeneratorInput,
    TermPickerInput,
    TextInput,
  } = pluginContext.inputComponents;

  const {
    configKey: config,
  } = pluginContext.configHelpers;

  const coreFields = getCoreFields(pluginContext);

  return {
    document: {
      [config]: {
        view: {
          type: CompoundInput,
          props: {
            defaultChildSubpath: 'ns2:conservation_common',
          },
        },
      },
      // Define core fields
      ...coreFields,
      'ns2:conservation_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/conservation',
          },
        },
        conservationNumber: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.conservation_common.conservationNumber.name',
                defaultMessage: 'Conservation treatment reference number',
              },
            }),
            required: true,
            searchView: {
              type: TextInput,
            },
            view: {
              type: IDGeneratorInput,
              props: {
                idGeneratorName: 'conservation',
              },
            },
          },
        },
        conservationStatusGroupList: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.conservation_common.conservationStatusGroupList.name',
                defaultMessage: 'Procedural status',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          conservationStatusGroup: {
            [config]: {
              repeating: true,
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                },
              },
            },
            status: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.conservation_common.status.name',
                    defaultMessage: 'Status',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'conservationstatus',
                  },
                },
              },
            },
            statusDate: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.conservation_common.statusDate.name',
                    defaultMessage: 'Status date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
          },
        },
        treatmentPurpose: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.conservation_common.treatmentPurpose.name',
                defaultMessage: 'Treatment purpose',
              },
            }),
            view: {
              type: TermPickerInput,
              props: {
                source: 'treatmentpurpose',
              },
            },
          },
        },
        conservators: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.conservation_common.conservators.name',
                defaultMessage: 'Conservator',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          conservator: {
            [config]: {
              repeating: true,
              messages: defineMessages({
                name: {
                  id: 'field.conservation_common.conservator.name',
                  defaultMessage: 'Conservator',
                },
              }),
              view: {
                type: AutocompleteInput,
                props: {
                  source: 'person/local,person/shared',
                },
              },
            },
          },
        },
        otherPartyGroupList: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.conservation_common.otherPartyGroupList.name',
                defaultMessage: 'Other treatment party',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          otherPartyGroup: {
            [config]: {
              repeating: true,
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                },
              },
            },
            otherParty: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.conservation_common.otherParty.name',
                    defaultMessage: 'Other party',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'person/local,person/shared',
                  },
                },
              },
            },
            otherPartyRole: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.conservation_common.otherPartyRole.name',
                    defaultMessage: 'Other party role',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'otherpartyrole',
                  },
                },
              },
            },
            otherPartyNote: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.conservation_common.otherPartyNote.name',
                    defaultMessage: 'Other party note',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        examinationGroupList: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.conservation_common.examinationGroupList.name',
                defaultMessage: 'Examination information',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          examinationGroup: {
            [config]: {
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            examinationStaff: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.conservation_common.examinationStaff.name',
                    defaultMessage: 'Exam staff',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'person/local,person/shared',
                  },
                },
              },

            },
            examinationPhase: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.conservation_common.examinationPhase.name',
                    defaultMessage: 'Phase of treatment',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'examinationphase',
                  },
                },
              },
            },
            examinationDate: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.conservation_common.examinationDate.name',
                    defaultMessage: 'Exam date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            examinationNote: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.conservation_common.examinationNote.name',
                    defaultMessage: 'Examination note',
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
        fabricationNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.conservation_common.fabricationNote.name',
                defaultMessage: 'Fabrication notes',
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
        proposedTreatment: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.conservation_common.proposedTreatment.name',
                defaultMessage: 'Proposed treatment',
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
        approvedBy: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.conservation_common.approvedBy.name',
                defaultMessage: 'Approved by',
              },
            }),
            view: {
              type: AutocompleteInput,
              props: {
                source: 'person/local,person/shared',
              },
            },
          },
        },
        approvedDate: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.conservation_common.approvedDate.name',
                defaultMessage: 'Date approved',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        treatmentStartDate: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.conservation_common.treatmentStartDate.name',
                defaultMessage: 'Treatment start date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        treatmentEndDate: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.conservation_common.treatmentEndDate.name',
                defaultMessage: 'Treatment end date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        treatmentSummary: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.conservation_common.treatmentSummary.name',
                defaultMessage: 'Treatment summary',
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
        researcher: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.conservation_common.researcher.name',
                defaultMessage: 'Researcher',
              },
            }),
            view: {
              type: AutocompleteInput,
              props: {
                source: 'person/local,person/shared',
              },
            },
          },
        },
        proposedAnalysis: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.conservation_common.proposedAnalysis.name',
                defaultMessage: 'Proposed analysis',
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
        proposedAnalysisDate: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.conservation_common.proposedAnalysisDate.name',
                defaultMessage: 'Date analysis proposed',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        destAnalysisGroupList: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.conservation_common.destAnalysisGroupList.name',
                defaultMessage: 'Destructive analysis',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          destAnalysisGroup: {
            [config]: {
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            destAnalysisApprovedDate: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.conservation_common.destAnalysisApprovedDate.name',
                    defaultMessage: 'Date approved',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            destAnalysisApprovalNote: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.conservation_common.destAnalysisApprovalNote.name',
                    defaultMessage: 'Approval notes',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            sampleBy: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.conservation_common.sampleBy.name',
                    defaultMessage: 'Sample taken by',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'person/local,person/shared',
                  },
                },
              },
            },
            sampleDate: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.conservation_common.sampleDate.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            sampleDescription: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.conservation_common.sampleDescription.name',
                    defaultMessage: 'Sample description',
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
            sampleReturned: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.conservation_common.sampleReturned.name',
                    defaultMessage: 'Sample returned?',
                  },
                }),
                view: {
                  type: CheckboxInput,
                },
              },
            },
            sampleReturnedLocation: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.conservation_common.sampleReturnedLocation.name',
                    defaultMessage: 'Sample returned location',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        analysisMethod: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.conservation_common.analysisMethod.name',
                defaultMessage: 'Analytical methodology',
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
        analysisResults: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.conservation_common.analysisResults.name',
                defaultMessage: 'Analytical results',
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
