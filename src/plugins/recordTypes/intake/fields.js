import { defineMessages } from 'react-intl';

export default (pluginContext) => {
  const {
    CompoundInput,
    DateInput,
    OptionPickerInput,
    TextInput,
    AutocompleteInput,
    IDGeneratorInput,
    TermPickerInput,
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
            defaultChildSubpath: 'ns2:intakes_common',
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
      'ns2:intakes_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/intake',
          },
        },
        entryNumber: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.intakes_common.entryNumber.name',
                defaultMessage: 'Intake entry number',
              },
            }),
            required: true,
            searchView: {
              type: TextInput,
            },
            view: {
              type: IDGeneratorInput,
              props: {
                idGeneratorName: 'intake,study,evaluation',
              },
            },
          },
        },
        entryDate: {
          [config]: {
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
            messages: defineMessages({
              name: {
                id: 'field.intakes_common.entryMethods.name',
                defaultMessage: 'Entry method',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          entryMethod: {
            [config]: {
              repeating: true,
              messages: defineMessages({
                name: {
                  id: 'field.intakes_common.entryMethod.name',
                  defaultMessage: 'Entry method',
                },
              }),
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
                defaultMessage: 'Depositor',
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
                defaultMessage: 'Depositor requirements',
              },
            }),
            view: {
              type: TextInput,
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
            messages: defineMessages({
              name: {
                id: 'field.intakes_common.fieldCollectionMethods.name',
                defaultMessage: 'Field collection method',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          fieldCollectionMethod: {
            [config]: {
              repeating: true,
              messages: defineMessages({
                name: {
                  id: 'field.intakes_common.fieldCollectionMethod.name',
                  defaultMessage: 'Field collection method',
                },
              }),
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
            messages: defineMessages({
              name: {
                id: 'field.intakes_common.fieldCollectionSources.name',
                defaultMessage: 'Field collection source',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          fieldCollectionSource: {
            [config]: {
              repeating: true,
              messages: defineMessages({
                name: {
                  id: 'field.intakes_common.fieldCollectionSource.name',
                  defaultMessage: 'Field collection source',
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
        },
        fieldCollectors: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.intakes_common.fieldCollectors.name',
                defaultMessage: 'Field collector',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          fieldCollector: {
            [config]: {
              repeating: true,
              messages: defineMessages({
                name: {
                  id: 'field.intakes_common.fieldCollector.name',
                  defaultMessage: 'Field collector',
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
        },
        fieldCollectionEventNames: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.intakes_common.fieldCollectionEventNames.name',
                defaultMessage: 'Field collection event name',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          fieldCollectionEventName: {
            [config]: {
              repeating: true,
              messages: defineMessages({
                name: {
                  id: 'field.intakes_common.fieldCollectionEventName.name',
                  defaultMessage: 'Field collection event name',
                },
              }),
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
            messages: defineMessages({
              name: {
                id: 'field.intakes_common.insurers.name',
                defaultMessage: 'Insurer',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          insurer: {
            [config]: {
              repeating: true,
              messages: defineMessages({
                name: {
                  id: 'field.intakes_common.insurer.name',
                  defaultMessage: 'Insurer',
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
            messages: defineMessages({
              name: {
                id: 'field.intakes_common.insuranceRenewalDate.name',
                defaultMessage: 'Renewal date',
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
            messages: defineMessages({
              name: {
                id: 'field.intakes_common.currentLocationGroupList.name',
                defaultMessage: 'Current location',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          currentLocationGroup: {
            [config]: {
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
                    defaultMessage: 'Current location',
                  },
                }),
                view: {
                  type: AutocompleteInput,
                  props: {
                    source: 'location/local,location/offsite',
                  },
                },
              },
            },
            currentLocationFitness: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.intakes_common.currentLocationFitness.name',
                    defaultMessage: 'Current location fitness',
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
                    defaultMessage: 'Current location note',
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
                source: 'location/local,location/offsite',
              },
            },
          },
        },
        conditionCheckMethods: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.intakes_common.conditionCheckMethods.name',
                defaultMessage: 'Condition check method',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          conditionCheckMethod: {
            [config]: {
              repeating: true,
              messages: defineMessages({
                name: {
                  id: 'field.intakes_common.conditionCheckMethod.name',
                  defaultMessage: 'Condition check method',
                },
              }),
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
            messages: defineMessages({
              name: {
                id: 'field.intakes_common.conditionCheckReasons.name',
                defaultMessage: 'Condition check reason',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          conditionCheckReason: {
            [config]: {
              repeating: true,
              messages: defineMessages({
                name: {
                  id: 'field.intakes_common.conditionCheckReason.name',
                  defaultMessage: 'Condition check reason',
                },
              }),
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
            messages: defineMessages({
              name: {
                id: 'field.intakes_common.conditionCheckersOrAssessors.name',
                defaultMessage: 'Condition check assessor',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          conditionCheckerOrAssessor: {
            [config]: {
              repeating: true,
              messages: defineMessages({
                name: {
                  id: 'field.intakes_common.conditionCheckerOrAssessor.name',
                  defaultMessage: 'Condition check assessor',
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
