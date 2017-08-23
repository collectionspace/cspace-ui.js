import { defineMessages } from 'react-intl';

export default (pluginContext) => {
  const {
    CompoundInput,
    DateInput,
    OptionPickerInput,
    TextInput,
    AutocompleteInput,
    IDGeneratorInput,
  } = pluginContext.inputComponents;

  const {
    configKey: config,
  } = pluginContext.configHelpers;

  const {
    DATA_TYPE_DATETIME,
  } = pluginContext.dataTypes;

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
            messages: defineMessages({
              name: {
                id: 'field.conditionchecks_common.completenessGroupList.name',
                defaultMessage: 'Completeness',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          completenessGroup: {
            [config]: {
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
                  name: {
                    id: 'field.conditionchecks_common.completeness.name',
                    defaultMessage: 'Completeness',
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
                messages: defineMessages({
                  name: {
                    id: 'field.conditionchecks_common.completenessDate.name',
                    defaultMessage: 'Completeness date',
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
                  name: {
                    id: 'field.conditionchecks_common.completenessNote.name',
                    defaultMessage: 'Completeness note',
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
            messages: defineMessages({
              name: {
                id: 'field.conditionchecks_common.conditionCheckGroupList.name',
                defaultMessage: 'Condition',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          conditionCheckGroup: {
            [config]: {
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
                  name: {
                    id: 'field.conditionchecks_common.condition.name',
                    defaultMessage: 'Condition',
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
                messages: defineMessages({
                  name: {
                    id: 'field.conditionchecks_common.conditionDate.name',
                    defaultMessage: 'Condition date',
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
                  name: {
                    id: 'field.conditionchecks_common.conditionNote.name',
                    defaultMessage: 'Condition note',
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
            messages: defineMessages({
              name: {
                id: 'field.conditionchecks_common.envConditionNoteGroupList.name',
                defaultMessage: 'Environmental condition note',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          envConditionNoteGroup: {
            [config]: {
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
                  name: {
                    id: 'field.conditionchecks_common.envConditionNote.name',
                    defaultMessage: 'Environmental condition note',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            envConditionNoteDate: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.conditionchecks_common.envConditionNoteDate.name',
                    defaultMessage: 'Environmental condition date',
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
            messages: defineMessages({
              name: {
                id: 'field.conditionchecks_common.nextConditionCheckDate.name',
                defaultMessage: 'Next condition/assessment date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        techAssessmentGroupList: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.conditionchecks_common.techAssessmentGroupList.name',
                defaultMessage: 'Technical assessment',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          techAssessmentGroup: {
            [config]: {
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
                  name: {
                    id: 'field.conditionchecks_common.techAssessment.name',
                    defaultMessage: 'Technical assessment',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            techAssessmentDate: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.conditionchecks_common.techAssessmentDate.name',
                    defaultMessage: 'Technical assessment date',
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
            messages: defineMessages({
              name: {
                id: 'field.conditionchecks_common.hazardGroupList.name',
                defaultMessage: 'Hazard',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          hazardGroup: {
            [config]: {
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
                  name: {
                    id: 'field.conditionchecks_common.hazard.name',
                    defaultMessage: 'Hazard',
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
                messages: defineMessages({
                  name: {
                    id: 'field.conditionchecks_common.hazardDate.name',
                    defaultMessage: 'Hazard date',
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
                  name: {
                    id: 'field.conditionchecks_common.hazardNote.name',
                    defaultMessage: 'Hazard note',
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
            messages: defineMessages({
              name: {
                id: 'field.conditionchecks_common.conditionCheckAssessmentDate.name',
                defaultMessage: 'Condition check/assessment date',
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
                defaultMessage: 'Condition check/assessment method',
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
                defaultMessage: 'Condition check/assessment note',
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
                defaultMessage: 'Condition check/assessment reason',
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
            messages: defineMessages({
              name: {
                id: 'field.conditionchecks_common.conditionCheckRefNumber.name',
                defaultMessage: 'Condition check/assessment reference number',
              },
            }),
            required: true,
            searchView: {
              type: TextInput,
            },
            view: {
              type: IDGeneratorInput,
              props: {
                idGeneratorName: 'conditioncheck',
              },
            },
          },
        },
        conditionChecker: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.conditionchecks_common.conditionChecker.name',
                defaultMessage: 'Condition checker/assessor',
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
                defaultMessage: 'Display recommendations',
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
                defaultMessage: 'Environmental recommendations',
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
                defaultMessage: 'Handling recommendations',
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
                defaultMessage: 'Packing recommendations',
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
                defaultMessage: 'Security recommendations',
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
                defaultMessage: 'Special requirements',
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
                defaultMessage: 'Storage recommendations',
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
                defaultMessage: 'Legal requirements',
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
            messages: defineMessages({
              name: {
                id: 'field.conditionchecks_common.salvagePriorityCodeGroupList.name',
                defaultMessage: 'Salvage priority code',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          salvagePriorityCodeGroup: {
            [config]: {
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
                  name: {
                    id: 'field.conditionchecks_common.salvagePriorityCode.name',
                    defaultMessage: 'Salvage priority code',
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
                messages: defineMessages({
                  name: {
                    id: 'field.conditionchecks_common.salvagePriorityCodeDate.name',
                    defaultMessage: 'Salvage priority code date',
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
            messages: defineMessages({
              name: {
                id: 'field.conditionchecks_common.legalReqsHeldGroupList.name',
                defaultMessage: 'Legal/license requirements held',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          legalReqsHeldGroup: {
            [config]: {
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
                  name: {
                    id: 'field.conditionchecks_common.legalReqsHeld.name',
                    defaultMessage: 'Legal/license requirements held',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            legalReqsHeldBeginDate: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.conditionchecks_common.legalReqsHeldBeginDate.name',
                    defaultMessage: 'Legal/license requirements held begin date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            legalReqsHeldEndDate: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.conditionchecks_common.legalReqsHeldEndDate.name',
                    defaultMessage: 'Legal/license requirements held begin date',
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
                  name: {
                    id: 'field.conditionchecks_common.legalReqsHeldNumber.name',
                    defaultMessage: 'Legal/license requirements held number',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            legalReqsHeldRenewDate: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.conditionchecks_common.legalReqsHeldRenewDate.name',
                    defaultMessage: 'Legal/license requirements held begin date',
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
