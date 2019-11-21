import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    CompoundInput,
    DateInput,
    OptionPickerInput,
    TextInput,
    AutocompleteInput,
    IDGeneratorInput,
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
            defaultChildSubpath: 'ns2:conditionchecks_common',
          },
        },
      },
      ...extensions.core.fields,
      'ns2:conditionchecks_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/conditioncheck',
          },
        },
        objectAuditCategory: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.conditionchecks_common.objectAuditCategory.name',
                defaultMessage: 'Object audit category',
              },
            }),
            view: {
              type: OptionPickerInput,
              props: {
                source: 'objectAuditCategories',
              },
            },
          },
        },
        completenessGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          completenessGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.conditionchecks_common.completenessGroup.name',
                  defaultMessage: 'Completeness',
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
            completeness: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.conditionchecks_common.completeness.fullName',
                    defaultMessage: 'Completeness description',
                  },
                  name: {
                    id: 'field.conditionchecks_common.completeness.name',
                    defaultMessage: 'Description',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'completenessLevels',
                  },
                },
              },
            },
            completenessDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.conditionchecks_common.completenessDate.fullName',
                    defaultMessage: 'Completeness date',
                  },
                  name: {
                    id: 'field.conditionchecks_common.completenessDate.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            completenessNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.conditionchecks_common.completenessNote.fullName',
                    defaultMessage: 'Completeness note',
                  },
                  name: {
                    id: 'field.conditionchecks_common.completenessNote.name',
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
        conditionCheckGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          conditionCheckGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.conditionchecks_common.conditionCheckGroup.name',
                  defaultMessage: 'Condition',
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
            condition: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.conditionchecks_common.condition.fullName',
                    defaultMessage: 'Condition description',
                  },
                  name: {
                    id: 'field.conditionchecks_common.condition.name',
                    defaultMessage: 'Description',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'conditions',
                  },
                },
              },
            },
            conditionDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.conditionchecks_common.conditionDate.fullName',
                    defaultMessage: 'Condition date',
                  },
                  name: {
                    id: 'field.conditionchecks_common.conditionDate.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            conditionNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.conditionchecks_common.conditionNote.fullName',
                    defaultMessage: 'Condition note',
                  },
                  name: {
                    id: 'field.conditionchecks_common.conditionNote.name',
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
        conservationTreatmentPriority: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.conditionchecks_common.conservationTreatmentPriority.name',
                defaultMessage: 'Conservation treatment priority',
              },
            }),
            view: {
              type: OptionPickerInput,
              props: {
                source: 'conservationTreatmentPriorities',
              },
            },
          },
        },
        envConditionNoteGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          envConditionNoteGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.conditionchecks_common.envConditionNoteGroup.name',
                  defaultMessage: 'Environmental condition',
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
            envConditionNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.conditionchecks_common.envConditionNote.fullName',
                    defaultMessage: 'Environmental condition note',
                  },
                  name: {
                    id: 'field.conditionchecks_common.envConditionNote.name',
                    defaultMessage: 'Note',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            envConditionNoteDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.conditionchecks_common.envConditionNoteDate.fullName',
                    defaultMessage: 'Environmental condition date',
                  },
                  name: {
                    id: 'field.conditionchecks_common.envConditionNoteDate.name',
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
        nextConditionCheckDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              name: {
                id: 'field.conditionchecks_common.nextConditionCheckDate.name',
                defaultMessage: 'Next check/assessment date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        techAssessmentGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          techAssessmentGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.conditionchecks_common.techAssessmentGroup.name',
                  defaultMessage: 'Technical assessment',
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
            techAssessment: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.conditionchecks_common.techAssessment.fullName',
                    defaultMessage: 'Technical assessment description',
                  },
                  name: {
                    id: 'field.conditionchecks_common.techAssessment.name',
                    defaultMessage: 'Description',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            techAssessmentDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.conditionchecks_common.techAssessmentDate.fullName',
                    defaultMessage: 'Technical assessment date',
                  },
                  name: {
                    id: 'field.conditionchecks_common.techAssessmentDate.name',
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
        hazardGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          hazardGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.conditionchecks_common.hazardGroup.name',
                  defaultMessage: 'Hazard',
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
            hazard: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.conditionchecks_common.hazard.fullName',
                    defaultMessage: 'Hazard description',
                  },
                  name: {
                    id: 'field.conditionchecks_common.hazard.name',
                    defaultMessage: 'Description',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'hazards',
                  },
                },
              },
            },
            hazardDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.conditionchecks_common.hazardDate.fullName',
                    defaultMessage: 'Hazard date',
                  },
                  name: {
                    id: 'field.conditionchecks_common.hazardDate.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            hazardNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.conditionchecks_common.hazardNote.fullName',
                    defaultMessage: 'Hazard note',
                  },
                  name: {
                    id: 'field.conditionchecks_common.hazardNote.name',
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
        conditionCheckAssessmentDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              name: {
                id: 'field.conditionchecks_common.conditionCheckAssessmentDate.name',
                defaultMessage: 'Check/assessment date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        conditionCheckMethod: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.conditionchecks_common.conditionCheckMethod.name',
                defaultMessage: 'Method',
              },
            }),
            view: {
              type: OptionPickerInput,
              props: {
                source: 'conditionCheckMethods',
              },
            },
          },
        },
        conditionCheckNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.conditionchecks_common.conditionCheckNote.name',
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
        conditionCheckReason: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.conditionchecks_common.conditionCheckReason.name',
                defaultMessage: 'Reason',
              },
            }),
            view: {
              type: OptionPickerInput,
              props: {
                source: 'conditionCheckReasons',
              },
            },
          },
        },
        conditionCheckRefNumber: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              name: {
                id: 'field.conditionchecks_common.conditionCheckRefNumber.name',
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
                source: 'conditioncheck',
              },
            },
          },
        },
        conditionChecker: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.conditionchecks_common.conditionChecker.name',
                defaultMessage: 'Checker/assessor',
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
        displayRecommendations: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.conditionchecks_common.displayRecommendations.name',
                defaultMessage: 'Display recommendation',
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
        envRecommendations: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.conditionchecks_common.envRecommendations.name',
                defaultMessage: 'Environmental recommendation',
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
        handlingRecommendations: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.conditionchecks_common.handlingRecommendations.name',
                defaultMessage: 'Handling recommendation',
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
        packingRecommendations: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.conditionchecks_common.packingRecommendations.name',
                defaultMessage: 'Packing recommendation',
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
        securityRecommendations: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.conditionchecks_common.securityRecommendations.name',
                defaultMessage: 'Security recommendation',
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
        specialRequirements: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.conditionchecks_common.specialRequirements.name',
                defaultMessage: 'Special requirement',
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
        storageRequirements: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.conditionchecks_common.storageRequirements.name',
                defaultMessage: 'Storage recommendation',
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
        legalRequirements: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.conditionchecks_common.legalRequirements.name',
                defaultMessage: 'Legal requirement',
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
        salvagePriorityCodeGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          salvagePriorityCodeGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.conditionchecks_common.salvagePriorityCodeGroup.name',
                  defaultMessage: 'Salvage priority',
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
            salvagePriorityCode: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.conditionchecks_common.salvagePriorityCode.fullName',
                    defaultMessage: 'Salvage priority code',
                  },
                  name: {
                    id: 'field.conditionchecks_common.salvagePriorityCode.name',
                    defaultMessage: 'Code',
                  },
                }),
                view: {
                  type: OptionPickerInput,
                  props: {
                    source: 'salvagePriorityCodes',
                  },
                },
              },
            },
            salvagePriorityCodeDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.conditionchecks_common.salvagePriorityCodeDate.fullName',
                    defaultMessage: 'Salvage priority date',
                  },
                  name: {
                    id: 'field.conditionchecks_common.salvagePriorityCodeDate.name',
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
        legalReqsHeldGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          legalReqsHeldGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.conditionchecks_common.legalReqsHeldGroup.name',
                  defaultMessage: 'Legal/license requirement held',
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
            legalReqsHeld: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.conditionchecks_common.legalReqsHeld.fullName',
                    defaultMessage: 'Legal/license requirement held description',
                  },
                  name: {
                    id: 'field.conditionchecks_common.legalReqsHeld.name',
                    defaultMessage: 'Description',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            legalReqsHeldBeginDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.conditionchecks_common.legalReqsHeldBeginDate.fullName',
                    defaultMessage: 'Legal/license requirement held begin date',
                  },
                  name: {
                    id: 'field.conditionchecks_common.legalReqsHeldBeginDate.name',
                    defaultMessage: 'Begin date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            legalReqsHeldEndDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.conditionchecks_common.legalReqsHeldEndDate.fullName',
                    defaultMessage: 'Legal/license requirement held end date',
                  },
                  name: {
                    id: 'field.conditionchecks_common.legalReqsHeldEndDate.name',
                    defaultMessage: 'End date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            legalReqsHeldNumber: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.conditionchecks_common.legalReqsHeldNumber.fullName',
                    defaultMessage: 'Legal/license requirement held number',
                  },
                  name: {
                    id: 'field.conditionchecks_common.legalReqsHeldNumber.name',
                    defaultMessage: 'Number',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            legalReqsHeldRenewDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  fullName: {
                    id: 'field.conditionchecks_common.legalReqsHeldRenewDate.fullName',
                    defaultMessage: 'Legal/license requirement held renewal date',
                  },
                  name: {
                    id: 'field.conditionchecks_common.legalReqsHeldRenewDate.name',
                    defaultMessage: 'Renewal date',
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
