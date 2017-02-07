export default (pluginContext) => {
  const {
    AuthorityControlledInput,
    CompoundInput,
    DateInput,
    IDGeneratorInput,
    OptionListControlledInput,
    StructuredDateInput,
    TextInput,
    VocabularyControlledInput,
  } = pluginContext.inputComponents;

  const {
    config,
  } = pluginContext.configHelpers.fieldDescriptorKeys;

  return {
    document: {
      [config]: {
        ui: {
          type: CompoundInput,
          props: {
            defaultChildSubpath: 'ns2:collectionobjects_common',
          },
        },
      },
      'ns2:collectionobjects_common': {
        objectNumber: {
          [config]: {
            ui: {
              type: IDGeneratorInput,
              props: {
                idGeneratorName: 'accession,intake,loanin',
              },
            },
          },
        },
        numberOfObjects: {
          [config]: {
            ui: {
              type: TextInput,
            },
          },
        },
        otherNumberList: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          otherNumber: {
            [config]: {
              ui: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            numberType: {
              [config]: {
                ui: {
                  type: OptionListControlledInput,
                  props: {
                    optionListName: 'numberTypes',
                  },
                },
              },
            },
            numberValue: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
          },
        },
        responsibleDepartments: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          responsibleDepartment: {
            [config]: {
              ui: {
                type: OptionListControlledInput,
                props: {
                  optionListName: 'departments',
                  repeating: true,
                },
              },
            },
          },
        },
        collection: {
          [config]: {
            ui: {
              type: OptionListControlledInput,
              props: {
                optionListName: 'collections',
              },
            },
          },
        },
        recordStatus: {
          [config]: {
            defaultValue: 'new',
            ui: {
              type: OptionListControlledInput,
              props: {
                optionListName: 'recordStatuses',
              },
            },
          },
        },
        briefDescriptions: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          briefDescription: {
            [config]: {
              ui: {
                type: TextInput,
                props: {
                  multiline: true,
                  repeating: true,
                },
              },
            },
          },
        },
        distinguishingFeatures: {
          [config]: {
            ui: {
              type: TextInput,
              props: {
                multiline: true,
              },
            },
          },
        },
        comments: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          comment: {
            [config]: {
              ui: {
                type: TextInput,
                props: {
                  multiline: true,
                  repeating: true,
                },
              },
            },
          },
        },
        computedCurrentLocation: {
          [config]: {
            ui: {
              type: TextInput,
            },
          },
        },
        titleGroupList: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          titleGroup: {
            [config]: {
              ui: {
                type: CompoundInput,
                props: {
                  repeating: true,
                },
              },
            },
            title: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
            titleLanguage: {
              [config]: {
                defaultValue: 'urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(eng)\'English\'',
                ui: {
                  type: VocabularyControlledInput,
                  props: {
                    vocabularyName: 'languages',
                  },
                },
              },
            },
            titleTranslationSubGroupList: {
              [config]: {
                ui: {
                  type: CompoundInput,
                },
              },
              titleTranslationSubGroup: {
                [config]: {
                  ui: {
                    type: CompoundInput,
                    props: {
                      tabular: true,
                      repeating: true,
                    },
                  },
                },
                titleTranslation: {
                  [config]: {
                    ui: {
                      type: TextInput,
                    },
                  },
                },
                titleTranslationLanguage: {
                  [config]: {
                    defaultValue: 'urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(eng)\'English\'',
                    ui: {
                      type: VocabularyControlledInput,
                      props: {
                        vocabularyName: 'languages',
                      },
                    },
                  },
                },
              },
            },
            titleType: {
              [config]: {
                ui: {
                  type: OptionListControlledInput,
                  props: {
                    optionListName: 'titleTypes',
                  },
                },
              },
            },
          },
        },
        objectNameList: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          objectNameGroup: {
            [config]: {
              ui: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            objectName: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
            objectNameCurrency: {
              [config]: {
                ui: {
                  type: OptionListControlledInput,
                  props: {
                    optionListName: 'nameCurrencies',
                  },
                },
              },
            },
            objectNameLevel: {
              [config]: {
                ui: {
                  type: OptionListControlledInput,
                  props: {
                    optionListName: 'nameLevels',
                  },
                },
              },
            },
            objectNameSystem: {
              [config]: {
                ui: {
                  type: OptionListControlledInput,
                  props: {
                    optionListName: 'nameSystems',
                  },
                },
              },
            },
            objectNameType: {
              [config]: {
                ui: {
                  type: OptionListControlledInput,
                  props: {
                    optionListName: 'nameTypes',
                  },
                },
              },
            },
            objectNameLanguage: {
              [config]: {
                defaultValue: 'urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(eng)\'English\'',
                ui: {
                  type: VocabularyControlledInput,
                  props: {
                    vocabularyName: 'languages',
                  },
                },
              },
            },
            objectNameNote: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
          },
        },
        copyNumber: {
          [config]: {
            ui: {
              type: TextInput,
            },
          },
        },
        objectStatusList: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          objectStatus: {
            [config]: {
              ui: {
                type: OptionListControlledInput,
                props: {
                  optionListName: 'objectStatuses',
                  repeating: true,
                },
              },
            },
          },
        },
        sex: {
          [config]: {
            ui: {
              type: OptionListControlledInput,
              props: {
                optionListName: 'sexes',
              },
            },
          },
        },
        phase: {
          [config]: {
            ui: {
              type: OptionListControlledInput,
              props: {
                optionListName: 'phases',
              },
            },
          },
        },
        forms: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          form: {
            [config]: {
              ui: {
                type: OptionListControlledInput,
                props: {
                  optionListName: 'forms',
                  repeating: true,
                },
              },
            },
          },
        },
        editionNumber: {
          [config]: {
            ui: {
              type: TextInput,
            },
          },
        },
        age: {
          [config]: {
            ui: {
              type: TextInput,
            },
          },
        },
        ageQualifier: {
          [config]: {
            ui: {
              type: VocabularyControlledInput,
              props: {
                vocabularyName: 'agequalifier',
              },
            },
          },
        },
        ageUnit: {
          [config]: {
            ui: {
              type: OptionListControlledInput,
              props: {
                optionListName: 'ageUnits',
              },
            },
          },
        },
        styles: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          style: {
            [config]: {
              ui: {
                type: TextInput,
                props: {
                  repeating: true,
                },
              },
            },
          },
        },
        colors: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          color: {
            [config]: {
              ui: {
                type: TextInput,
                props: {
                  repeating: true,
                },
              },
            },
          },
        },
        materialGroupList: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          materialGroup: {
            [config]: {
              ui: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            material: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
            materialComponent: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
            materialComponentNote: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
            materialName: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
            materialSource: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
          },
        },
        physicalDescription: {
          [config]: {
            ui: {
              type: TextInput,
              props: {
                multiline: true,
              },
            },
          },
        },
        objectComponentGroupList: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          objectComponentGroup: {
            [config]: {
              ui: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            objectComponentName: {
              [config]: {
                ui: {
                  type: OptionListControlledInput,
                  props: {
                    optionListName: 'objectComponentNames',
                  },
                },
              },
            },
            objectComponentInformation: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
          },
        },
        technicalAttributeGroupList: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          technicalAttributeGroup: {
            [config]: {
              ui: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            technicalAttribute: {
              [config]: {
                ui: {
                  type: OptionListControlledInput,
                  props: {
                    optionListName: 'technicalAttributes',
                  },
                },
              },
            },
            technicalAttributeMeasurement: {
              [config]: {
                ui: {
                  type: OptionListControlledInput,
                  props: {
                    optionListName: 'technicalAttributeMeasurements',
                  },
                },
              },
            },
            technicalAttributeMeasurementUnit: {
              [config]: {
                ui: {
                  type: OptionListControlledInput,
                  props: {
                    optionListName: 'technicalAttributeMeasurementUnits',
                  },
                },
              },
            },
          },
        },
        measuredPartGroupList: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          measuredPartGroup: {
            [config]: {
              ui: {
                type: CompoundInput,
                props: {
                  repeating: true,
                },
              },
            },
            measuredPart: {
              [config]: {
                ui: {
                  type: OptionListControlledInput,
                  props: {
                    optionListName: 'measuredParts',
                  },
                },
              },
            },
            dimensionSummary: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
            dimensionSubGroupList: {
              [config]: {
                ui: {
                  type: CompoundInput,
                },
              },
              dimensionSubGroup: {
                [config]: {
                  ui: {
                    type: CompoundInput,
                    props: {
                      tabular: true,
                      repeating: true,
                    },
                  },
                },
                dimension: {
                  [config]: {
                    ui: {
                      type: OptionListControlledInput,
                      props: {
                        optionListName: 'dimensions',
                      },
                    },
                  },
                },
                measuredBy: {
                  [config]: {
                    ui: {
                      type: AuthorityControlledInput,
                      props: {
                        authority: 'person/local,person/shared,organization/local,organization/shared',
                      },
                    },
                  },
                },
                measurementMethod: {
                  [config]: {
                    ui: {
                      type: OptionListControlledInput,
                      props: {
                        optionListName: 'measurementMethods',
                      },
                    },
                  },
                },
                value: {
                  [config]: {
                    ui: {
                      type: TextInput,
                    },
                  },
                },
                measurementUnit: {
                  [config]: {
                    ui: {
                      type: OptionListControlledInput,
                      props: {
                        optionListName: 'measurementUnits',
                      },
                    },
                  },
                },
                valueQualifier: {
                  [config]: {
                    ui: {
                      type: TextInput,
                    },
                  },
                },
                valueDate: {
                  [config]: {
                    ui: {
                      type: DateInput,
                    },
                  },
                },
              },
            },
          },
        },
        contentDescription: {
          [config]: {
            ui: {
              type: TextInput,
              props: {
                multiline: true,
              },
            },
          },
        },
        contentLanguages: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          contentLanguage: {
            [config]: {
              defaultValue: 'urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(eng)\'English\'',
              ui: {
                type: VocabularyControlledInput,
                props: {
                  vocabularyName: 'languages',
                  repeating: true,
                },
              },
            },
          },
        },
        contentActivities: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          contentActivity: {
            [config]: {
              ui: {
                type: TextInput,
                props: {
                  repeating: true,
                },
              },
            },
          },
        },
        contentConcepts: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          contentConcept: {
            [config]: {
              ui: {
                type: AuthorityControlledInput,
                props: {
                  authority: 'concept/associated,concept/material,concept/material_shared',
                  repeating: true,
                },
              },
            },
          },
        },
        contentDateGroup: {
          [config]: {
            ui: {
              type: StructuredDateInput,
            },
          },
        },
        contentPositions: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          contentPosition: {
            [config]: {
              ui: {
                type: OptionListControlledInput,
                props: {
                  optionListName: 'positions',
                  repeating: true,
                },
              },
            },
          },
        },
        contentObjectGroupList: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          contentObjectGroup: {
            [config]: {
              ui: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            contentObject: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
            contentObjectType: {
              [config]: {
                ui: {
                  type: OptionListControlledInput,
                  props: {
                    optionListName: 'contentObjectTypes',
                  },
                },
              },
            },
          },
        },
        contentPeoples: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          contentPeople: {
            [config]: {
              ui: {
                type: TextInput,
                props: {
                  repeating: true,
                },
              },
            },
          },
        },
        contentPersons: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          contentPerson: {
            [config]: {
              ui: {
                type: AuthorityControlledInput,
                props: {
                  authority: 'person/local,person/shared,person/ulan',
                  repeating: true,
                },
              },
            },
          },
        },
        contentPlaces: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          contentPlace: {
            [config]: {
              ui: {
                type: TextInput,
                props: {
                  repeating: true,
                },
              },
            },
          },
        },
        contentScripts: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          contentScript: {
            [config]: {
              ui: {
                type: OptionListControlledInput,
                props: {
                  optionListName: 'scripts',
                  repeating: true,
                },
              },
            },
          },
        },
        contentOrganizations: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          contentOrganization: {
            [config]: {
              ui: {
                type: AuthorityControlledInput,
                props: {
                  authority: 'organization/local,organization/shared,organization/ulan',
                  repeating: true,
                },
              },
            },
          },
        },
        contentEventNameGroupList: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          contentEventNameGroup: {
            [config]: {
              ui: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            contentEventName: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
            contentEventNameType: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
          },
        },
        contentOtherGroupList: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          contentOtherGroup: {
            [config]: {
              ui: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            contentOther: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
            contentOtherType: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
          },
        },
        contentNote: {
          [config]: {
            ui: {
              type: TextInput,
              props: {
                multiline: true,
              },
            },
          },
        },
        textualInscriptionGroupList: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          textualInscriptionGroup: {
            [config]: {
              ui: {
                type: CompoundInput,
                props: {
                  repeating: true,
                },
              },
            },
            inscriptionContent: {
              [config]: {
                ui: {
                  type: TextInput,
                  props: {
                    multiline: true,
                  },
                },
              },
            },
            inscriptionContentInscriber: {
              [config]: {
                ui: {
                  type: AuthorityControlledInput,
                  props: {
                    authority: 'person/local,organization/local,organization/shared',
                  },
                },
              },
            },
            inscriptionContentLanguage: {
              [config]: {
                defaultValue: 'urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(eng)\'English\'',
                ui: {
                  type: VocabularyControlledInput,
                  props: {
                    vocabularyName: 'languages',
                  },
                },
              },
            },
            inscriptionContentDateGroup: {
              [config]: {
                ui: {
                  type: StructuredDateInput,
                },
              },
            },
            inscriptionContentPosition: {
              [config]: {
                ui: {
                  type: OptionListControlledInput,
                  props: {
                    optionListName: 'positions',
                  },
                },
              },
            },
            inscriptionContentScript: {
              [config]: {
                ui: {
                  type: OptionListControlledInput,
                  props: {
                    optionListName: 'scripts',
                  },
                },
              },
            },
            inscriptionContentType: {
              [config]: {
                ui: {
                  type: OptionListControlledInput,
                  props: {
                    optionListName: 'inscriptionTypes',
                  },
                },
              },
            },
            inscriptionContentMethod: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
            inscriptionContentInterpretation: {
              [config]: {
                ui: {
                  type: TextInput,
                  props: {
                    multiline: true,
                  },
                },
              },
            },
            inscriptionContentTranslation: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
            inscriptionContentTransliteration: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
          },
        },
        nonTextualInscriptionGroupList: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          nonTextualInscriptionGroup: {
            [config]: {
              ui: {
                type: CompoundInput,
                props: {
                  repeating: true,
                },
              },
            },
            inscriptionDescription: {
              [config]: {
                ui: {
                  type: TextInput,
                  props: {
                    multiline: true,
                  },
                },
              },
            },
            inscriptionDescriptionInscriber: {
              [config]: {
                ui: {
                  type: AuthorityControlledInput,
                  props: {
                    authority: 'person/local,person/shared,organization/local,organization/shared',
                  },
                },
              },
            },
            inscriptionDescriptionDateGroup: {
              [config]: {
                ui: {
                  type: StructuredDateInput,
                },
              },
            },
            inscriptionDescriptionPosition: {
              [config]: {
                ui: {
                  type: OptionListControlledInput,
                  props: {
                    optionListName: 'positions',
                  },
                },
              },
            },
            inscriptionDescriptionType: {
              [config]: {
                ui: {
                  type: OptionListControlledInput,
                  props: {
                    optionListName: 'inscriptionTypes',
                  },
                },
              },
            },
            inscriptionDescriptionMethod: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
            inscriptionDescriptionInterpretation: {
              [config]: {
                ui: {
                  type: TextInput,
                  props: {
                    multiline: true,
                  },
                },
              },
            },
          },
        },
        objectProductionDateGroupList: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          objectProductionDateGroup: {
            [config]: {
              ui: {
                type: StructuredDateInput,
                props: {
                  repeating: true,
                },
              },
            },
          },
        },
        techniqueGroupList: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          techniqueGroup: {
            [config]: {
              ui: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            technique: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
            techniqueType: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
          },
        },
        objectProductionPlaceGroupList: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          objectProductionPlaceGroup: {
            [config]: {
              ui: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            objectProductionPlace: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
            objectProductionPlaceRole: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
          },
        },
        objectProductionReasons: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          objectProductionReason: {
            [config]: {
              ui: {
                type: TextInput,
                props: {
                  multiline: true,
                  repeating: true,
                },
              },
            },
          },
        },
        objectProductionPeopleGroupList: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          objectProductionPeopleGroup: {
            [config]: {
              ui: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            objectProductionPeople: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
            objectProductionPeopleRole: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
          },
        },
        objectProductionPersonGroupList: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          objectProductionPersonGroup: {
            [config]: {
              ui: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            objectProductionPerson: {
              [config]: {
                ui: {
                  type: AuthorityControlledInput,
                  props: {
                    authority: 'person/local,person/shared',
                  },
                },
              },
            },
            objectProductionPersonRole: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
          },
        },
        objectProductionOrganizationGroupList: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          objectProductionOrganizationGroup: {
            [config]: {
              ui: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            objectProductionOrganization: {
              [config]: {
                ui: {
                  type: AuthorityControlledInput,
                  props: {
                    authority: 'organization/local,organization/shared',
                  },
                },
              },
            },
            objectProductionOrganizationRole: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
          },
        },
        objectProductionNote: {
          [config]: {
            ui: {
              type: TextInput,
              props: {
                multiline: true,
              },
            },
          },
        },
        assocActivityGroupList: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          assocActivityGroup: {
            [config]: {
              ui: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            assocActivity: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
            assocActivityType: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
            assocActivityNote: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
          },
        },
        assocObjectGroupList: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          assocObjectGroup: {
            [config]: {
              ui: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            assocObject: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
            assocObjectType: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
            assocObjectNote: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
          },
        },
        assocConceptGroupList: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          assocConceptGroup: {
            [config]: {
              ui: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            assocConcept: {
              [config]: {
                ui: {
                  type: AuthorityControlledInput,
                  props: {
                    authority: 'concept/associated',
                  },
                },
              },
            },
            assocConceptType: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
            assocConceptNote: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
          },
        },
        assocCulturalContextGroupList: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          assocCulturalContextGroup: {
            [config]: {
              ui: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            assocCulturalContext: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
            assocCulturalContextType: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
            assocCulturalContextNote: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
          },
        },
        assocOrganizationGroupList: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          assocOrganizationGroup: {
            [config]: {
              ui: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            assocOrganization: {
              [config]: {
                ui: {
                  type: AuthorityControlledInput,
                  props: {
                    authority: 'organization/local,organization/shared',
                  },
                },
              },
            },
            assocOrganizationType: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
            assocOrganizationNote: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
          },
        },
        assocPeopleGroupList: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          assocPeopleGroup: {
            [config]: {
              ui: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            assocPeople: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
            assocPeopleType: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
            assocPeopleNote: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
          },
        },
        assocPersonGroupList: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          assocPersonGroup: {
            [config]: {
              ui: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            assocPerson: {
              [config]: {
                ui: {
                  type: AuthorityControlledInput,
                  props: {
                    authority: 'person/local,person/shared',
                  },
                },
              },
            },
            assocPersonType: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
            assocPersonNote: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
          },
        },
        assocPlaceGroupList: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          assocPlaceGroup: {
            [config]: {
              ui: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            assocPlace: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
            assocPlaceType: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
            assocPlaceNote: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
          },
        },
        assocEventName: {
          [config]: {
            ui: {
              type: TextInput,
            },
          },
        },
        assocEventNameType: {
          [config]: {
            ui: {
              type: TextInput,
            },
          },
        },
        assocEventOrganizations: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          assocEventOrganization: {
            [config]: {
              ui: {
                type: AuthorityControlledInput,
                props: {
                  authority: 'organization/local,organization/shared',
                  repeating: true,
                },
              },
            },
          },
        },
        assocEventPeoples: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          assocEventPeople: {
            [config]: {
              ui: {
                type: TextInput,
                props: {
                  repeating: true,
                },
              },
            },
          },
        },
        assocEventPersons: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          assocEventPerson: {
            [config]: {
              ui: {
                type: AuthorityControlledInput,
                props: {
                  authority: 'person/local,person/shared',
                  repeating: true,
                },
              },
            },
          },
        },
        assocEventPlaces: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          assocEventPlace: {
            [config]: {
              ui: {
                type: TextInput,
                props: {
                  repeating: true,
                },
              },
            },
          },
        },
        assocEventNote: {
          [config]: {
            ui: {
              type: TextInput,
            },
          },
        },
        assocDateGroupList: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          assocDateGroup: {
            [config]: {
              ui: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            assocStructuredDateGroup: {
              [config]: {
                ui: {
                  type: StructuredDateInput,
                },
              },
            },
            assocDateType: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
            assocDateNote: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
          },
        },
        objectHistoryNote: {
          [config]: {
            ui: {
              type: TextInput,
              props: {
                multiline: true,
              },
            },
          },
        },
        usageGroupList: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          usageGroup: {
            [config]: {
              ui: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            usage: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
            usageNote: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
          },
        },
        owners: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          owner: {
            [config]: {
              ui: {
                type: AuthorityControlledInput,
                props: {
                  authority: 'person/local,person/shared,organization/local,organization/shared',
                  repeating: true,
                },
              },
            },
          },
        },
        ownershipDateGroupList: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          ownershipDateGroup: {
            [config]: {
              ui: {
                type: StructuredDateInput,
                props: {
                  repeating: true,
                },
              },
            },
          },
        },
        ownershipAccess: {
          [config]: {
            ui: {
              type: OptionListControlledInput,
              props: {
                optionListName: 'ownershipAccessLevels',
              },
            },
          },
        },
        ownershipCategory: {
          [config]: {
            ui: {
              type: OptionListControlledInput,
              props: {
                optionListName: 'ownershipCategories',
              },
            },
          },
        },
        ownershipPlace: {
          [config]: {
            ui: {
              type: TextInput,
            },
          },
        },
        ownershipExchangeMethod: {
          [config]: {
            ui: {
              type: OptionListControlledInput,
              props: {
                optionListName: 'ownershipExchangeMethods',
              },
            },
          },
        },
        ownershipExchangeNote: {
          [config]: {
            ui: {
              type: TextInput,
            },
          },
        },
        ownershipExchangePriceCurrency: {
          [config]: {
            defaultValue: 'urn:cspace:core.collectionspace.org:vocabularies:name(currency):item:name(USD)\'US Dollar\'',
            ui: {
              type: VocabularyControlledInput,
              props: {
                vocabularyName: 'currency',
              },
            },
          },
        },
        ownershipExchangePriceValue: {
          [config]: {
            ui: {
              type: TextInput,
            },
          },
        },
        ownersPersonalExperience: {
          [config]: {
            ui: {
              type: TextInput,
              props: {
                multiline: true,
              },
            },
          },
        },
        ownersPersonalResponse: {
          [config]: {
            ui: {
              type: TextInput,
              props: {
                multiline: true,
              },
            },
          },
        },
        ownersReferences: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          ownersReference: {
            [config]: {
              ui: {
                type: TextInput,
                props: {
                  repeating: true,
                },
              },
            },
          },
        },
        ownersContributionNote: {
          [config]: {
            ui: {
              type: TextInput,
              props: {
                multiline: true,
              },
            },
          },
        },
        viewersRole: {
          [config]: {
            ui: {
              type: TextInput,
            },
          },
        },
        viewersPersonalExperience: {
          [config]: {
            ui: {
              type: TextInput,
              props: {
                multiline: true,
              },
            },
          },
        },
        viewersPersonalResponse: {
          [config]: {
            ui: {
              type: TextInput,
              props: {
                multiline: true,
              },
            },
          },
        },
        viewersReferences: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          viewersReference: {
            [config]: {
              ui: {
                type: TextInput,
                props: {
                  repeating: true,
                },
              },
            },
          },
        },
        viewersContributionNote: {
          [config]: {
            ui: {
              type: TextInput,
              props: {
                multiline: true,
              },
            },
          },
        },
        referenceGroupList: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          referenceGroup: {
            [config]: {
              ui: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            reference: {
              [config]: {
                ui: {
                  type: AuthorityControlledInput,
                  props: {
                    authority: 'citation/local,citation/shared,citation/worldcat',
                  },
                },
              },
            },
            referenceNote: {
              [config]: {
                ui: {
                  type: TextInput,
                },
              },
            },
          },
        },
        fieldCollectionDateGroup: {
          [config]: {
            ui: {
              type: StructuredDateInput,
            },
          },
        },
        fieldCollectionMethods: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          fieldCollectionMethod: {
            [config]: {
              ui: {
                type: VocabularyControlledInput,
                props: {
                  vocabularyName: 'collectionmethod',
                  repeating: true,
                },
              },
            },
          },
        },
        fieldCollectionNote: {
          [config]: {
            ui: {
              type: TextInput,
              props: {
                multiline: true,
              },
            },
          },
        },
        fieldCollectionNumber: {
          [config]: {
            ui: {
              type: TextInput,
            },
          },
        },
        fieldCollectionPlace: {
          [config]: {
            ui: {
              type: AuthorityControlledInput,
              props: {
                authority: 'place/local,place/shared,place/tgn',
              },
            },
          },
        },
        fieldCollectionSources: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          fieldCollectionSource: {
            [config]: {
              ui: {
                type: AuthorityControlledInput,
                props: {
                  authority: 'person/local,person/shared',
                  repeating: true,
                },
              },
            },
          },
        },
        fieldCollectors: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          fieldCollector: {
            [config]: {
              ui: {
                type: AuthorityControlledInput,
                props: {
                  authority: 'person/local,person/shared,organization/local,organization/shared',
                  repeating: true,
                },
              },
            },
          },
        },
        fieldColEventNames: {
          [config]: {
            ui: {
              type: CompoundInput,
            },
          },
          fieldColEventName: {
            [config]: {
              ui: {
                type: TextInput,
                props: {
                  repeating: true,
                },
              },
            },
          },
        },
      },
    },
  };
};
