import { defineMessages } from 'react-intl';

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

  const {
    DATA_TYPE_DATE,
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
            defaultChildSubpath: 'ns2:conservation_common',
          },
        },
      },
      ...extensions.core.fields,
      'ns2:conservation_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/conservation',
          },
        },
        conservationNumber: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              name: {
                id: 'field.conservation_common.conservationNumber.name',
                defaultMessage: 'Reference number',
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
            view: {
              type: CompoundInput,
            },
          },
          conservationStatusGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.conservation_common.conservationStatusGroup.name',
                  defaultMessage: 'Procedural status',
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
            status: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.conservation_common.status.name',
                    defaultMessage: 'Status',
                  },
                  fullName: {
                    id: 'field.conservation_common.status.fullName',
                    defaultMessage: 'Procedural status',
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
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  name: {
                    id: 'field.conservation_common.statusDate.name',
                    defaultMessage: 'Date',
                  },
                  fullName: {
                    id: 'field.conservation_common.statusDate.fullName',
                    defaultMessage: 'Procedural status date',
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
            view: {
              type: CompoundInput,
            },
          },
          otherPartyGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.conservation_common.otherPartyGroup.name',
                  defaultMessage: 'Other treatment party',
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
            otherParty: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.conservation_common.otherParty.name',
                    defaultMessage: 'Name',
                  },
                  fullName: {
                    id: 'field.conservation_common.otherParty.fullName',
                    defaultMessage: 'Other treatment party name',
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
                    defaultMessage: 'Role',
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
        examinationGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          examinationGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.conservation_common.examinationGroup.name',
                  defaultMessage: 'Examination',
                },
              }),
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
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  name: {
                    id: 'field.conservation_common.examinationDate.name',
                    defaultMessage: 'Date',
                  },
                  fullName: {
                    id: 'field.conservation_common.examinationDate.fullName',
                    defaultMessage: 'Examination date',
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
        fabricationNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.conservation_common.fabricationNote.name',
                defaultMessage: 'Fabrication note',
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
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              name: {
                id: 'field.conservation_common.approvedDate.name',
                defaultMessage: 'Approval date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        treatmentStartDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
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
            dataType: DATA_TYPE_DATE,
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
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              name: {
                id: 'field.conservation_common.proposedAnalysisDate.name',
                defaultMessage: 'Proposal date',
              },
              fullName: {
                id: 'field.conservation_common.proposedAnalysisDate.fullName',
                defaultMessage: 'Analysis proposal date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        destAnalysisGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          destAnalysisGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.conservation_common.destAnalysisGroup.name',
                  defaultMessage: 'Destructive analysis',
                },
              }),
              repeating: true,
              view: {
                type: CompoundInput,
              },
            },
            destAnalysisApprovedDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  name: {
                    id: 'field.conservation_common.destAnalysisApprovedDate.name',
                    defaultMessage: 'Approval date',
                  },
                  fullName: {
                    id: 'field.conservation_common.destAnalysisApprovedDate.fullName',
                    defaultMessage: 'Destructive analysis approval date',
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
                    defaultMessage: 'Approval note',
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
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  name: {
                    id: 'field.conservation_common.sampleDate.name',
                    defaultMessage: 'Sample date',
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
                    defaultMessage: 'Sample returned',
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
                defaultMessage: 'Analytical result',
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
