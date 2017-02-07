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
        view: {
          type: CompoundInput,
          props: {
            defaultChildSubpath: 'ns2:collectionobjects_common',
          },
        },
      },
      'ns2:collectionobjects_common': {
        objectNumber: {
          [config]: {
            view: {
              type: IDGeneratorInput,
              props: {
                idGeneratorName: 'accession,intake,loanin',
              },
            },
          },
        },
        numberOfObjects: {
          [config]: {
            view: {
              type: TextInput,
            },
          },
        },
        otherNumberList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          otherNumber: {
            [config]: {
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            numberType: {
              [config]: {
                view: {
                  type: OptionListControlledInput,
                  props: {
                    optionListName: 'numberTypes',
                  },
                },
              },
            },
            numberValue: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        responsibleDepartments: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          responsibleDepartment: {
            [config]: {
              view: {
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
            view: {
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
            view: {
              type: OptionListControlledInput,
              props: {
                optionListName: 'recordStatuses',
              },
            },
          },
        },
        briefDescriptions: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          briefDescription: {
            [config]: {
              view: {
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
            view: {
              type: TextInput,
              props: {
                multiline: true,
              },
            },
          },
        },
        comments: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          comment: {
            [config]: {
              view: {
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
            view: {
              type: TextInput,
            },
          },
        },
        titleGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          titleGroup: {
            [config]: {
              view: {
                type: CompoundInput,
                props: {
                  repeating: true,
                },
              },
            },
            title: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
            titleLanguage: {
              [config]: {
                defaultValue: 'urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(eng)\'English\'',
                view: {
                  type: VocabularyControlledInput,
                  props: {
                    vocabularyName: 'languages',
                  },
                },
              },
            },
            titleTranslationSubGroupList: {
              [config]: {
                view: {
                  type: CompoundInput,
                },
              },
              titleTranslationSubGroup: {
                [config]: {
                  view: {
                    type: CompoundInput,
                    props: {
                      tabular: true,
                      repeating: true,
                    },
                  },
                },
                titleTranslation: {
                  [config]: {
                    view: {
                      type: TextInput,
                    },
                  },
                },
                titleTranslationLanguage: {
                  [config]: {
                    defaultValue: 'urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(eng)\'English\'',
                    view: {
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
                view: {
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
            view: {
              type: CompoundInput,
            },
          },
          objectNameGroup: {
            [config]: {
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            objectName: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
            objectNameCurrency: {
              [config]: {
                view: {
                  type: OptionListControlledInput,
                  props: {
                    optionListName: 'nameCurrencies',
                  },
                },
              },
            },
            objectNameLevel: {
              [config]: {
                view: {
                  type: OptionListControlledInput,
                  props: {
                    optionListName: 'nameLevels',
                  },
                },
              },
            },
            objectNameSystem: {
              [config]: {
                view: {
                  type: OptionListControlledInput,
                  props: {
                    optionListName: 'nameSystems',
                  },
                },
              },
            },
            objectNameType: {
              [config]: {
                view: {
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
                view: {
                  type: VocabularyControlledInput,
                  props: {
                    vocabularyName: 'languages',
                  },
                },
              },
            },
            objectNameNote: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        copyNumber: {
          [config]: {
            view: {
              type: TextInput,
            },
          },
        },
        objectStatusList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          objectStatus: {
            [config]: {
              view: {
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
            view: {
              type: OptionListControlledInput,
              props: {
                optionListName: 'sexes',
              },
            },
          },
        },
        phase: {
          [config]: {
            view: {
              type: OptionListControlledInput,
              props: {
                optionListName: 'phases',
              },
            },
          },
        },
        forms: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          form: {
            [config]: {
              view: {
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
            view: {
              type: TextInput,
            },
          },
        },
        age: {
          [config]: {
            view: {
              type: TextInput,
            },
          },
        },
        ageQualifier: {
          [config]: {
            view: {
              type: VocabularyControlledInput,
              props: {
                vocabularyName: 'agequalifier',
              },
            },
          },
        },
        ageUnit: {
          [config]: {
            view: {
              type: OptionListControlledInput,
              props: {
                optionListName: 'ageUnits',
              },
            },
          },
        },
        styles: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          style: {
            [config]: {
              view: {
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
            view: {
              type: CompoundInput,
            },
          },
          color: {
            [config]: {
              view: {
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
            view: {
              type: CompoundInput,
            },
          },
          materialGroup: {
            [config]: {
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            material: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
            materialComponent: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
            materialComponentNote: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
            materialName: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
            materialSource: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        physicalDescription: {
          [config]: {
            view: {
              type: TextInput,
              props: {
                multiline: true,
              },
            },
          },
        },
        objectComponentGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          objectComponentGroup: {
            [config]: {
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            objectComponentName: {
              [config]: {
                view: {
                  type: OptionListControlledInput,
                  props: {
                    optionListName: 'objectComponentNames',
                  },
                },
              },
            },
            objectComponentInformation: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        technicalAttributeGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          technicalAttributeGroup: {
            [config]: {
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            technicalAttribute: {
              [config]: {
                view: {
                  type: OptionListControlledInput,
                  props: {
                    optionListName: 'technicalAttributes',
                  },
                },
              },
            },
            technicalAttributeMeasurement: {
              [config]: {
                view: {
                  type: OptionListControlledInput,
                  props: {
                    optionListName: 'technicalAttributeMeasurements',
                  },
                },
              },
            },
            technicalAttributeMeasurementUnit: {
              [config]: {
                view: {
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
            view: {
              type: CompoundInput,
            },
          },
          measuredPartGroup: {
            [config]: {
              view: {
                type: CompoundInput,
                props: {
                  repeating: true,
                },
              },
            },
            measuredPart: {
              [config]: {
                view: {
                  type: OptionListControlledInput,
                  props: {
                    optionListName: 'measuredParts',
                  },
                },
              },
            },
            dimensionSummary: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
            dimensionSubGroupList: {
              [config]: {
                view: {
                  type: CompoundInput,
                },
              },
              dimensionSubGroup: {
                [config]: {
                  view: {
                    type: CompoundInput,
                    props: {
                      tabular: true,
                      repeating: true,
                    },
                  },
                },
                dimension: {
                  [config]: {
                    view: {
                      type: OptionListControlledInput,
                      props: {
                        optionListName: 'dimensions',
                      },
                    },
                  },
                },
                measuredBy: {
                  [config]: {
                    view: {
                      type: AuthorityControlledInput,
                      props: {
                        authority: 'person/local,person/shared,organization/local,organization/shared',
                      },
                    },
                  },
                },
                measurementMethod: {
                  [config]: {
                    view: {
                      type: OptionListControlledInput,
                      props: {
                        optionListName: 'measurementMethods',
                      },
                    },
                  },
                },
                value: {
                  [config]: {
                    view: {
                      type: TextInput,
                    },
                  },
                },
                measurementUnit: {
                  [config]: {
                    view: {
                      type: OptionListControlledInput,
                      props: {
                        optionListName: 'measurementUnits',
                      },
                    },
                  },
                },
                valueQualifier: {
                  [config]: {
                    view: {
                      type: TextInput,
                    },
                  },
                },
                valueDate: {
                  [config]: {
                    view: {
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
            view: {
              type: TextInput,
              props: {
                multiline: true,
              },
            },
          },
        },
        contentLanguages: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          contentLanguage: {
            [config]: {
              defaultValue: 'urn:cspace:core.collectionspace.org:vocabularies:name(languages):item:name(eng)\'English\'',
              view: {
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
            view: {
              type: CompoundInput,
            },
          },
          contentActivity: {
            [config]: {
              view: {
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
            view: {
              type: CompoundInput,
            },
          },
          contentConcept: {
            [config]: {
              view: {
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
            view: {
              type: StructuredDateInput,
            },
          },
        },
        contentPositions: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          contentPosition: {
            [config]: {
              view: {
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
            view: {
              type: CompoundInput,
            },
          },
          contentObjectGroup: {
            [config]: {
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            contentObject: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
            contentObjectType: {
              [config]: {
                view: {
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
            view: {
              type: CompoundInput,
            },
          },
          contentPeople: {
            [config]: {
              view: {
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
            view: {
              type: CompoundInput,
            },
          },
          contentPerson: {
            [config]: {
              view: {
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
            view: {
              type: CompoundInput,
            },
          },
          contentPlace: {
            [config]: {
              view: {
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
            view: {
              type: CompoundInput,
            },
          },
          contentScript: {
            [config]: {
              view: {
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
            view: {
              type: CompoundInput,
            },
          },
          contentOrganization: {
            [config]: {
              view: {
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
            view: {
              type: CompoundInput,
            },
          },
          contentEventNameGroup: {
            [config]: {
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            contentEventName: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
            contentEventNameType: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        contentOtherGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          contentOtherGroup: {
            [config]: {
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            contentOther: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
            contentOtherType: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        contentNote: {
          [config]: {
            view: {
              type: TextInput,
              props: {
                multiline: true,
              },
            },
          },
        },
        textualInscriptionGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          textualInscriptionGroup: {
            [config]: {
              view: {
                type: CompoundInput,
                props: {
                  repeating: true,
                },
              },
            },
            inscriptionContent: {
              [config]: {
                view: {
                  type: TextInput,
                  props: {
                    multiline: true,
                  },
                },
              },
            },
            inscriptionContentInscriber: {
              [config]: {
                view: {
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
                view: {
                  type: VocabularyControlledInput,
                  props: {
                    vocabularyName: 'languages',
                  },
                },
              },
            },
            inscriptionContentDateGroup: {
              [config]: {
                view: {
                  type: StructuredDateInput,
                },
              },
            },
            inscriptionContentPosition: {
              [config]: {
                view: {
                  type: OptionListControlledInput,
                  props: {
                    optionListName: 'positions',
                  },
                },
              },
            },
            inscriptionContentScript: {
              [config]: {
                view: {
                  type: OptionListControlledInput,
                  props: {
                    optionListName: 'scripts',
                  },
                },
              },
            },
            inscriptionContentType: {
              [config]: {
                view: {
                  type: OptionListControlledInput,
                  props: {
                    optionListName: 'inscriptionTypes',
                  },
                },
              },
            },
            inscriptionContentMethod: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
            inscriptionContentInterpretation: {
              [config]: {
                view: {
                  type: TextInput,
                  props: {
                    multiline: true,
                  },
                },
              },
            },
            inscriptionContentTranslation: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
            inscriptionContentTransliteration: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        nonTextualInscriptionGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          nonTextualInscriptionGroup: {
            [config]: {
              view: {
                type: CompoundInput,
                props: {
                  repeating: true,
                },
              },
            },
            inscriptionDescription: {
              [config]: {
                view: {
                  type: TextInput,
                  props: {
                    multiline: true,
                  },
                },
              },
            },
            inscriptionDescriptionInscriber: {
              [config]: {
                view: {
                  type: AuthorityControlledInput,
                  props: {
                    authority: 'person/local,person/shared,organization/local,organization/shared',
                  },
                },
              },
            },
            inscriptionDescriptionDateGroup: {
              [config]: {
                view: {
                  type: StructuredDateInput,
                },
              },
            },
            inscriptionDescriptionPosition: {
              [config]: {
                view: {
                  type: OptionListControlledInput,
                  props: {
                    optionListName: 'positions',
                  },
                },
              },
            },
            inscriptionDescriptionType: {
              [config]: {
                view: {
                  type: OptionListControlledInput,
                  props: {
                    optionListName: 'inscriptionTypes',
                  },
                },
              },
            },
            inscriptionDescriptionMethod: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
            inscriptionDescriptionInterpretation: {
              [config]: {
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
        objectProductionDateGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          objectProductionDateGroup: {
            [config]: {
              view: {
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
            view: {
              type: CompoundInput,
            },
          },
          techniqueGroup: {
            [config]: {
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            technique: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
            techniqueType: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        objectProductionPlaceGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          objectProductionPlaceGroup: {
            [config]: {
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            objectProductionPlace: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
            objectProductionPlaceRole: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        objectProductionReasons: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          objectProductionReason: {
            [config]: {
              view: {
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
            view: {
              type: CompoundInput,
            },
          },
          objectProductionPeopleGroup: {
            [config]: {
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            objectProductionPeople: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
            objectProductionPeopleRole: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        objectProductionPersonGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          objectProductionPersonGroup: {
            [config]: {
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            objectProductionPerson: {
              [config]: {
                view: {
                  type: AuthorityControlledInput,
                  props: {
                    authority: 'person/local,person/shared',
                  },
                },
              },
            },
            objectProductionPersonRole: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        objectProductionOrganizationGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          objectProductionOrganizationGroup: {
            [config]: {
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            objectProductionOrganization: {
              [config]: {
                view: {
                  type: AuthorityControlledInput,
                  props: {
                    authority: 'organization/local,organization/shared',
                  },
                },
              },
            },
            objectProductionOrganizationRole: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        objectProductionNote: {
          [config]: {
            view: {
              type: TextInput,
              props: {
                multiline: true,
              },
            },
          },
        },
        assocActivityGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          assocActivityGroup: {
            [config]: {
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            assocActivity: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
            assocActivityType: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
            assocActivityNote: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        assocObjectGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          assocObjectGroup: {
            [config]: {
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            assocObject: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
            assocObjectType: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
            assocObjectNote: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        assocConceptGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          assocConceptGroup: {
            [config]: {
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            assocConcept: {
              [config]: {
                view: {
                  type: AuthorityControlledInput,
                  props: {
                    authority: 'concept/associated',
                  },
                },
              },
            },
            assocConceptType: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
            assocConceptNote: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        assocCulturalContextGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          assocCulturalContextGroup: {
            [config]: {
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            assocCulturalContext: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
            assocCulturalContextType: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
            assocCulturalContextNote: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        assocOrganizationGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          assocOrganizationGroup: {
            [config]: {
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            assocOrganization: {
              [config]: {
                view: {
                  type: AuthorityControlledInput,
                  props: {
                    authority: 'organization/local,organization/shared',
                  },
                },
              },
            },
            assocOrganizationType: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
            assocOrganizationNote: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        assocPeopleGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          assocPeopleGroup: {
            [config]: {
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            assocPeople: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
            assocPeopleType: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
            assocPeopleNote: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        assocPersonGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          assocPersonGroup: {
            [config]: {
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            assocPerson: {
              [config]: {
                view: {
                  type: AuthorityControlledInput,
                  props: {
                    authority: 'person/local,person/shared',
                  },
                },
              },
            },
            assocPersonType: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
            assocPersonNote: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        assocPlaceGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          assocPlaceGroup: {
            [config]: {
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            assocPlace: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
            assocPlaceType: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
            assocPlaceNote: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        assocEventName: {
          [config]: {
            view: {
              type: TextInput,
            },
          },
        },
        assocEventNameType: {
          [config]: {
            view: {
              type: TextInput,
            },
          },
        },
        assocEventOrganizations: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          assocEventOrganization: {
            [config]: {
              view: {
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
            view: {
              type: CompoundInput,
            },
          },
          assocEventPeople: {
            [config]: {
              view: {
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
            view: {
              type: CompoundInput,
            },
          },
          assocEventPerson: {
            [config]: {
              view: {
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
            view: {
              type: CompoundInput,
            },
          },
          assocEventPlace: {
            [config]: {
              view: {
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
            view: {
              type: TextInput,
            },
          },
        },
        assocDateGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          assocDateGroup: {
            [config]: {
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            assocStructuredDateGroup: {
              [config]: {
                view: {
                  type: StructuredDateInput,
                },
              },
            },
            assocDateType: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
            assocDateNote: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        objectHistoryNote: {
          [config]: {
            view: {
              type: TextInput,
              props: {
                multiline: true,
              },
            },
          },
        },
        usageGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          usageGroup: {
            [config]: {
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            usage: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
            usageNote: {
              [config]: {
                view: {
                  type: TextInput,
                },
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
              view: {
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
            view: {
              type: CompoundInput,
            },
          },
          ownershipDateGroup: {
            [config]: {
              view: {
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
            view: {
              type: OptionListControlledInput,
              props: {
                optionListName: 'ownershipAccessLevels',
              },
            },
          },
        },
        ownershipCategory: {
          [config]: {
            view: {
              type: OptionListControlledInput,
              props: {
                optionListName: 'ownershipCategories',
              },
            },
          },
        },
        ownershipPlace: {
          [config]: {
            view: {
              type: TextInput,
            },
          },
        },
        ownershipExchangeMethod: {
          [config]: {
            view: {
              type: OptionListControlledInput,
              props: {
                optionListName: 'ownershipExchangeMethods',
              },
            },
          },
        },
        ownershipExchangeNote: {
          [config]: {
            view: {
              type: TextInput,
            },
          },
        },
        ownershipExchangePriceCurrency: {
          [config]: {
            defaultValue: 'urn:cspace:core.collectionspace.org:vocabularies:name(currency):item:name(USD)\'US Dollar\'',
            view: {
              type: VocabularyControlledInput,
              props: {
                vocabularyName: 'currency',
              },
            },
          },
        },
        ownershipExchangePriceValue: {
          [config]: {
            view: {
              type: TextInput,
            },
          },
        },
        ownersPersonalExperience: {
          [config]: {
            view: {
              type: TextInput,
              props: {
                multiline: true,
              },
            },
          },
        },
        ownersPersonalResponse: {
          [config]: {
            view: {
              type: TextInput,
              props: {
                multiline: true,
              },
            },
          },
        },
        ownersReferences: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          ownersReference: {
            [config]: {
              view: {
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
            view: {
              type: TextInput,
              props: {
                multiline: true,
              },
            },
          },
        },
        viewersRole: {
          [config]: {
            view: {
              type: TextInput,
            },
          },
        },
        viewersPersonalExperience: {
          [config]: {
            view: {
              type: TextInput,
              props: {
                multiline: true,
              },
            },
          },
        },
        viewersPersonalResponse: {
          [config]: {
            view: {
              type: TextInput,
              props: {
                multiline: true,
              },
            },
          },
        },
        viewersReferences: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          viewersReference: {
            [config]: {
              view: {
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
            view: {
              type: TextInput,
              props: {
                multiline: true,
              },
            },
          },
        },
        referenceGroupList: {
          [config]: {
            view: {
              type: CompoundInput,
            },
          },
          referenceGroup: {
            [config]: {
              view: {
                type: CompoundInput,
                props: {
                  tabular: true,
                  repeating: true,
                },
              },
            },
            reference: {
              [config]: {
                view: {
                  type: AuthorityControlledInput,
                  props: {
                    authority: 'citation/local,citation/shared,citation/worldcat',
                  },
                },
              },
            },
            referenceNote: {
              [config]: {
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        fieldCollectionDateGroup: {
          [config]: {
            view: {
              type: StructuredDateInput,
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
              view: {
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
            view: {
              type: TextInput,
            },
          },
        },
        fieldCollectionPlace: {
          [config]: {
            view: {
              type: AuthorityControlledInput,
              props: {
                authority: 'place/local,place/shared,place/tgn',
              },
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
              view: {
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
            view: {
              type: CompoundInput,
            },
          },
          fieldCollector: {
            [config]: {
              view: {
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
            view: {
              type: CompoundInput,
            },
          },
          fieldColEventName: {
            [config]: {
              view: {
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
