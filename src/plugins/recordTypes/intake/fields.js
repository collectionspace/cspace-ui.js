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
            defaultChildSubpath: 'ns2:intakes_common',
          },
        },
      },
      ...extensions.core.fields,
      'ns2:intakes_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/intake',
          },
        },
        entryNumber: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              name: {
                id: 'field.intakes_common.entryNumber.name',
                defaultMessage: 'Entry number',
              },
            }),
            required: true,
            searchView: {
              type: TextInput,
            },
            view: {
              type: IDGeneratorInput,
              props: {
                source: 'intake,study,evaluation',
              },
            },
          },
        },
        entryDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              name: {
                id: 'field.intakes_common.entryDate.name',
                defaultMessage: 'Entry date',
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
                id: 'field.intakes_common.entryReason.name',
                defaultMessage: 'Entry reason',
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
                  id: 'field.intakes_common.entryMethod.name',
                  defaultMessage: 'Entry method',
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
        returnDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              name: {
                id: 'field.intakes_common.returnDate.name',
                defaultMessage: 'Return date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        currentOwner: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.intakes_common.currentOwner.name',
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
                id: 'field.intakes_common.depositor.name',
                defaultMessage: 'Name',
              },
              fullName: {
                id: 'field.intakes_common.depositor.fullName',
                defaultMessage: 'Depositor name',
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
        depositorsRequirements: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.intakes_common.despositorsRequirements.name',
                defaultMessage: 'Requirements',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        approvalGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          approvalGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.intakes_common.approvalGroup.name',
                  defaultMessage: 'Approval',
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
            approvalGroup: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.intakes_common.approvalGroup.fullName',
                    defaultMessage: 'Approval group',
                  },
                  name: {
                    id: 'field.approvalGroupField.approvalGroup.name',
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
            approvalIndividual: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.intakes_common.approvalIndividual.fullName',
                    defaultMessage: 'Approval individual',
                  },
                  name: {
                    id: 'field.intakes_common.approvalIndividual.name',
                    defaultMessage: 'Individual',
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
            approvalStatus: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.intakes_common.approvalStatus.fullName',
                    defaultMessage: 'Approval status',
                  },
                  name: {
                    id: 'field.intakes_common.approvalStatus.name',
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
            approvalDate: {
              [config]: {
                dataType: DATA_TYPE_DATE,
                messages: defineMessages({
                  name: {
                    id: 'field.intakes_common.approvalDate.name',
                    defaultMessage: 'Date',
                  },
                  fullName: {
                    id: 'field.intakes_common.approvalDate.fullName',
                    defaultMessage: 'Approval status date',
                  },
                }),
                view: {
                  type: DateInput,
                },
              },
            },
            approvalNote: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.intakes_common.approvalNote.name',
                    defaultMessage: 'Note',
                  },
                  fullName: {
                    id: 'field.intakes_common.approvalNote.fullName',
                    defaultMessage: 'Approval note',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        entryNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.intakes_common.entryNote.name',
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
        packingNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.intakes_common.packingNote.name',
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
        fieldCollectionDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              name: {
                id: 'field.intakes_common.fieldCollectionDate.name',
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
                  id: 'field.intakes_common.fieldCollectionMethod.name',
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
                id: 'field.intakes_common.fieldCollectionNote.name',
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
                id: 'field.intakes_common.fieldCollectionNumber.name',
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
                id: 'field.intakes_common.fieldCollectionPlace.name',
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
                  id: 'field.intakes_common.fieldCollectionSource.name',
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
                  id: 'field.intakes_common.fieldCollector.name',
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
                  id: 'field.intakes_common.fieldCollectionEventName.name',
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
        valuer: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.intakes_common.valuer.name',
                defaultMessage: 'Valuer',
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
        valuationReferenceNumber: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.intakes_common.valuationReferenceNumber.name',
                defaultMessage: 'Reference number',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        insurers: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          insurer: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.intakes_common.insurer.name',
                  defaultMessage: 'Insurer',
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
        insurancePolicyNumber: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.intakes_common.insurancePolicyNumber.name',
                defaultMessage: 'Policy number',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        insuranceRenewalDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              name: {
                id: 'field.intakes_common.insuranceRenewalDate.name',
                defaultMessage: 'Renewal date',
              },
              fullName: {
                id: 'field.intakes_common.insuranceRenewalDate.fullName',
                defaultMessage: 'Insurance renewal date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        insuranceReferenceNumber: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.intakes_common.insuranceReferenceNumber.name',
                defaultMessage: 'Reference number',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        insuranceNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.intakes_common.insuranceNote.name',
                defaultMessage: 'Insurance note',
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
        currentLocationGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          currentLocationGroup: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.intakes_common.currentLocationGroup.name',
                  defaultMessage: 'Current location',
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
            currentLocation: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.intakes_common.currentLocation.name',
                    defaultMessage: 'Location',
                  },
                  fullName: {
                    id: 'field.intakes_common.currentLocation.fullName',
                    defaultMessage: 'Current location',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'location/local,location/offsite,organization/local,organization/shared,place/local',
                  },
                },
              },
            },
            currentLocationFitness: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.intakes_common.currentLocationFitness.fullName',
                    defaultMessage: 'Current location fitness',
                  },
                  name: {
                    id: 'field.intakes_common.currentLocationFitness.name',
                    defaultMessage: 'Fitness',
                  },
                }),
                view: {
                  type: TermPickerInput,
                  props: {
                    source: 'conditionfitness',
                  },
                },
              },
            },
            currentLocationNote: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.intakes_common.currentLocationNote.name',
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
        locationDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              name: {
                id: 'field.intakes_common.locationDate.name',
                defaultMessage: 'Location date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        normalLocation: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.intakes_common.normalLocation.name',
                defaultMessage: 'Normal location',
              },
            }),
            view: {
              type: AutocompleteInput,
              props: {
                source: 'location/local,location/offsite,organization/local,organization/shared,place/local',
              },
            },
          },
        },
        conditionCheckMethods: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          conditionCheckMethod: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.intakes_common.conditionCheckMethod.name',
                  defaultMessage: 'Condition check method',
                },
              }),
              repeating: true,
              view: {
                type: TermPickerInput,
                props: {
                  source: 'conditioncheckmethod',
                },
              },
            },
          },
        },
        conditionCheckReasons: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          conditionCheckReason: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.intakes_common.conditionCheckReason.name',
                  defaultMessage: 'Condition check reason',
                },
              }),
              repeating: true,
              view: {
                type: TermPickerInput,
                props: {
                  source: 'conditioncheckreason',
                },
              },
            },
          },
        },
        conditionCheckersOrAssessors: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          conditionCheckerOrAssessor: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.intakes_common.conditionCheckerOrAssessor.name',
                  defaultMessage: 'Condition check assessor',
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
        conditionCheckNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.intakes_common.conditionCheckNote.name',
                defaultMessage: 'Condition check note',
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
        conditionCheckDate: {
          [config]: {
            dataType: DATA_TYPE_DATE,
            messages: defineMessages({
              name: {
                id: 'field.intakes_common.conditionCheckDate.name',
                defaultMessage: 'Condition check date',
              },
            }),
            view: {
              type: DateInput,
            },
          },
        },
        conditionCheckReferenceNumber: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.intakes_common.conditionCheckReferenceNumber.name',
                defaultMessage: 'Condition check reference number',
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
};
