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
    ui,
  } = pluginContext.configHelpers.fieldDescriptorKeys;

  return {
    document: {
      [ui]: {
        type: CompoundInput,
        props: {
          defaultChildSubpath: 'ns2:collectionobjects_common',
        },
      },
      'ns2:collectionobjects_common': {
        objectNumber: {
          [ui]: {
            type: IDGeneratorInput,
            props: {
              idGeneratorName: 'accession,intake,loanin',
            },
          },
        },
        numberOfObjects: {
          [ui]: {
            type: TextInput,
          },
        },
        otherNumberList: {
          [ui]: {
            type: CompoundInput,
          },
          otherNumber: {
            [ui]: {
              type: CompoundInput,
              props: {
                tabular: true,
                repeating: true,
              },
            },
            numberType: {
              [ui]: {
                type: OptionListControlledInput,
                props: {
                  optionListName: 'numberTypes',
                },
              },
            },
            numberValue: {
              [ui]: {
                type: TextInput,
              },
            },
          },
        },
        responsibleDepartments: {
          [ui]: {
            type: CompoundInput,
          },
          responsibleDepartment: {
            [ui]: {
              type: OptionListControlledInput,
              props: {
                optionListName: 'departments',
                repeating: true,
              },
            },
          },
        },
        collection: {
          [ui]: {
            type: OptionListControlledInput,
            props: {
              optionListName: 'collections',
            },
          },
        },
        recordStatus: {
          [ui]: {
            type: OptionListControlledInput,
            props: {
              optionListName: 'recordStatuses',
            },
          },
        },
        briefDescriptions: {
          [ui]: {
            type: CompoundInput,
          },
          briefDescription: {
            [ui]: {
              type: TextInput,
              props: {
                multiline: true,
                repeating: true,
              },
            },
          },
        },
        distinguishingFeatures: {
          [ui]: {
            type: TextInput,
            props: {
              multiline: true,
            },
          },
        },
        comments: {
          [ui]: {
            type: CompoundInput,
          },
          comment: {
            [ui]: {
              type: TextInput,
              props: {
                multiline: true,
                repeating: true,
              },
            },
          },
        },
        computedCurrentLocation: {
          [ui]: {
            type: TextInput,
          },
        },
        titleGroupList: {
          [ui]: {
            type: CompoundInput,
          },
          titleGroup: {
            [ui]: {
              type: CompoundInput,
              props: {
                repeating: true,
              },
            },
            title: {
              [ui]: {
                type: TextInput,
              },
            },
            titleLanguage: {
              [ui]: {
                type: VocabularyControlledInput,
                props: {
                  vocabularyName: 'languages',
                },
              },
            },
            titleTranslationSubGroupList: {
              [ui]: {
                type: CompoundInput,
              },
              titleTranslationSubGroup: {
                [ui]: {
                  type: CompoundInput,
                  props: {
                    tabular: true,
                    repeating: true,
                  },
                },
                titleTranslation: {
                  [ui]: {
                    type: TextInput,
                  },
                },
                titleTranslationLanguage: {
                  [ui]: {
                    type: VocabularyControlledInput,
                    props: {
                      vocabularyName: 'languages',
                    },
                  },
                },
              },
            },
            titleType: {
              [ui]: {
                type: OptionListControlledInput,
                props: {
                  optionListName: 'titleTypes',
                },
              },
            },
          },
        },
        objectNameList: {
          [ui]: {
            type: CompoundInput,
          },
          objectNameGroup: {
            [ui]: {
              type: CompoundInput,
              props: {
                tabular: true,
                repeating: true,
              },
            },
            objectName: {
              [ui]: {
                type: TextInput,
              },
            },
            objectNameCurrency: {
              [ui]: {
                type: OptionListControlledInput,
                props: {
                  optionListName: 'nameCurrencies',
                },
              },
            },
            objectNameLevel: {
              [ui]: {
                type: OptionListControlledInput,
                props: {
                  optionListName: 'nameLevels',
                },
              },
            },
            objectNameSystem: {
              [ui]: {
                type: OptionListControlledInput,
                props: {
                  optionListName: 'nameSystems',
                },
              },
            },
            objectNameType: {
              [ui]: {
                type: OptionListControlledInput,
                props: {
                  optionListName: 'nameTypes',
                },
              },
            },
            objectNameLanguage: {
              [ui]: {
                type: VocabularyControlledInput,
                props: {
                  vocabularyName: 'languages',
                },
              },
            },
            objectNameNote: {
              [ui]: {
                type: TextInput,
              },
            },
          },
        },
        copyNumber: {
          [ui]: {
            type: TextInput,
          },
        },
        objectStatusList: {
          [ui]: {
            type: CompoundInput,
          },
          objectStatus: {
            [ui]: {
              type: OptionListControlledInput,
              props: {
                optionListName: 'objectStatuses',
                repeating: true,
              },
            },
          },
        },
        sex: {
          [ui]: {
            type: OptionListControlledInput,
            props: {
              optionListName: 'sexes',
            },
          },
        },
        phase: {
          [ui]: {
            type: OptionListControlledInput,
            props: {
              optionListName: 'phases',
            },
          },
        },
        forms: {
          [ui]: {
            type: CompoundInput,
          },
          form: {
            [ui]: {
              type: OptionListControlledInput,
              props: {
                optionListName: 'forms',
                repeating: true,
              },
            },
          },
        },
        editionNumber: {
          [ui]: {
            type: TextInput,
          },
        },
        age: {
          [ui]: {
            type: TextInput,
          },
        },
        ageQualifier: {
          [ui]: {
            type: VocabularyControlledInput,
            props: {
              vocabularyName: 'agequalifier',
            },
          },
        },
        ageUnit: {
          [ui]: {
            type: OptionListControlledInput,
            props: {
              optionListName: 'ageUnits',
            },
          },
        },
        styles: {
          [ui]: {
            type: CompoundInput,
          },
          style: {
            [ui]: {
              type: TextInput,
              props: {
                repeating: true,
              },
            },
          },
        },
        colors: {
          [ui]: {
            type: CompoundInput,
          },
          color: {
            [ui]: {
              type: TextInput,
              props: {
                repeating: true,
              },
            },
          },
        },
        materialGroupList: {
          [ui]: {
            type: CompoundInput,
          },
          materialGroup: {
            [ui]: {
              type: CompoundInput,
              props: {
                tabular: true,
                repeating: true,
              },
            },
            material: {
              [ui]: {
                type: TextInput,
              },
            },
            materialComponent: {
              [ui]: {
                type: TextInput,
              },
            },
            materialComponentNote: {
              [ui]: {
                type: TextInput,
              },
            },
            materialName: {
              [ui]: {
                type: TextInput,
              },
            },
            materialSource: {
              [ui]: {
                type: TextInput,
              },
            },
          },
        },
        physicalDescription: {
          [ui]: {
            type: TextInput,
            props: {
              multiline: true,
            },
          },
        },
        objectComponentGroupList: {
          [ui]: {
            type: CompoundInput,
          },
          objectComponentGroup: {
            [ui]: {
              type: CompoundInput,
              props: {
                tabular: true,
                repeating: true,
              },
            },
            objectComponentName: {
              [ui]: {
                type: OptionListControlledInput,
                props: {
                  optionListName: 'objectComponentNames',
                },
              },
            },
            objectComponentInformation: {
              [ui]: {
                type: TextInput,
              },
            },
          },
        },
        technicalAttributeGroupList: {
          [ui]: {
            type: CompoundInput,
          },
          technicalAttributeGroup: {
            [ui]: {
              type: CompoundInput,
              props: {
                tabular: true,
                repeating: true,
              },
            },
            technicalAttribute: {
              [ui]: {
                type: OptionListControlledInput,
                props: {
                  optionListName: 'technicalAttributes',
                },
              },
            },
            technicalAttributeMeasurement: {
              [ui]: {
                type: OptionListControlledInput,
                props: {
                  optionListName: 'technicalAttributeMeasurements',
                },
              },
            },
            technicalAttributeMeasurementUnit: {
              [ui]: {
                type: OptionListControlledInput,
                props: {
                  optionListName: 'technicalAttributeMeasurementUnits',
                },
              },
            },
          },
        },
        measuredPartGroupList: {
          [ui]: {
            type: CompoundInput,
          },
          measuredPartGroup: {
            [ui]: {
              type: CompoundInput,
              props: {
                repeating: true,
              },
            },
            measuredPart: {
              [ui]: {
                type: OptionListControlledInput,
                props: {
                  optionListName: 'measuredParts',
                },
              },
            },
            dimensionSummary: {
              [ui]: {
                type: TextInput,
              },
            },
            dimensionSubGroupList: {
              [ui]: {
                type: CompoundInput,
              },
              dimensionSubGroup: {
                [ui]: {
                  type: CompoundInput,
                  props: {
                    tabular: true,
                    repeating: true,
                  },
                },
                dimension: {
                  [ui]: {
                    type: OptionListControlledInput,
                    props: {
                      optionListName: 'dimensions',
                    },
                  },
                },
                measuredBy: {
                  [ui]: {
                    type: AuthorityControlledInput,
                    props: {
                      authority: 'person/local,person/shared,organization/local,organization/shared',
                    },
                  },
                },
                measurementMethod: {
                  [ui]: {
                    type: OptionListControlledInput,
                    props: {
                      optionListName: 'measurementMethods',
                    },
                  },
                },
                value: {
                  [ui]: {
                    type: TextInput,
                  },
                },
                measurementUnit: {
                  [ui]: {
                    type: OptionListControlledInput,
                    props: {
                      optionListName: 'measurementUnits',
                    },
                  },
                },
                valueQualifier: {
                  [ui]: {
                    type: TextInput,
                  },
                },
                valueDate: {
                  [ui]: {
                    type: DateInput,
                  },
                },
              },
            },
          },
        },
        contentDescription: {
          [ui]: {
            type: TextInput,
            props: {
              multiline: true,
            },
          },
        },
        contentLanguages: {
          [ui]: {
            type: CompoundInput,
          },
          contentLanguage: {
            [ui]: {
              type: VocabularyControlledInput,
              props: {
                vocabularyName: 'languages',
                repeating: true,
              },
            },
          },
        },
        contentActivities: {
          [ui]: {
            type: CompoundInput,
          },
          contentActivity: {
            [ui]: {
              type: TextInput,
              props: {
                repeating: true,
              },
            },
          },
        },
        contentConcepts: {
          [ui]: {
            type: CompoundInput,
          },
          contentConcept: {
            [ui]: {
              type: AuthorityControlledInput,
              props: {
                authority: 'concept/associated,concept/material,concept/material_shared',
                repeating: true,
              },
            },
          },
        },
        contentDateGroup: {
          [ui]: {
            type: StructuredDateInput,
          },
        },
        contentPositions: {
          [ui]: {
            type: CompoundInput,
          },
          contentPosition: {
            [ui]: {
              type: OptionListControlledInput,
              props: {
                optionListName: 'positions',
                repeating: true,
              },
            },
          },
        },
        contentObjectGroupList: {
          [ui]: {
            type: CompoundInput,
          },
          contentObjectGroup: {
            [ui]: {
              type: CompoundInput,
              props: {
                tabular: true,
                repeating: true,
              },
            },
            contentObject: {
              [ui]: {
                type: TextInput,
              },
            },
            contentObjectType: {
              [ui]: {
                type: OptionListControlledInput,
                props: {
                  optionListName: 'contentObjectTypes',
                },
              },
            },
          },
        },
        contentPeoples: {
          [ui]: {
            type: CompoundInput,
          },
          contentPeople: {
            [ui]: {
              type: TextInput,
              props: {
                repeating: true,
              },
            },
          },
        },
        contentPersons: {
          [ui]: {
            type: CompoundInput,
          },
          contentPerson: {
            [ui]: {
              type: AuthorityControlledInput,
              props: {
                authority: 'person/local,person/shared,person/ulan',
                repeating: true,
              },
            },
          },
        },
        contentPlaces: {
          [ui]: {
            type: CompoundInput,
          },
          contentPlace: {
            [ui]: {
              type: TextInput,
              props: {
                repeating: true,
              },
            },
          },
        },
        contentScripts: {
          [ui]: {
            type: CompoundInput,
          },
          contentScript: {
            [ui]: {
              type: OptionListControlledInput,
              props: {
                optionListName: 'scripts',
                repeating: true,
              },
            },
          },
        },
        contentOrganizations: {
          [ui]: {
            type: CompoundInput,
          },
          contentOrganization: {
            [ui]: {
              type: AuthorityControlledInput,
              props: {
                authority: 'organization/local,organization/shared,organization/ulan',
                repeating: true,
              },
            },
          },
        },
        contentEventNameGroupList: {
          [ui]: {
            type: CompoundInput,
          },
          contentEventNameGroup: {
            [ui]: {
              type: CompoundInput,
              props: {
                tabular: true,
                repeating: true,
              },
            },
            contentEventName: {
              [ui]: {
                type: TextInput,
              },
            },
            contentEventNameType: {
              [ui]: {
                type: TextInput,
              },
            },
          },
        },
        contentOtherGroupList: {
          [ui]: {
            type: CompoundInput,
          },
          contentOtherGroup: {
            [ui]: {
              type: CompoundInput,
              props: {
                tabular: true,
                repeating: true,
              },
            },
            contentOther: {
              [ui]: {
                type: TextInput,
              },
            },
            contentOtherType: {
              [ui]: {
                type: TextInput,
              },
            },
          },
        },
        contentNote: {
          [ui]: {
            type: TextInput,
            props: {
              multiline: true,
            },
          },
        },
        textualInscriptionGroupList: {
          [ui]: {
            type: CompoundInput,
          },
          textualInscriptionGroup: {
            [ui]: {
              type: CompoundInput,
              props: {
                repeating: true,
              },
            },
            inscriptionContent: {
              [ui]: {
                type: TextInput,
                props: {
                  multiline: true,
                },
              },
            },
            inscriptionContentInscriber: {
              [ui]: {
                type: AuthorityControlledInput,
                props: {
                  authority: 'person/local,organization/local,organization/shared',
                },
              },
            },
            inscriptionContentLanguage: {
              [ui]: {
                type: VocabularyControlledInput,
                props: {
                  vocabularyName: 'languages',
                },
              },
            },
            inscriptionContentDateGroup: {
              [ui]: {
                type: StructuredDateInput,
              },
            },
            inscriptionContentPosition: {
              [ui]: {
                type: OptionListControlledInput,
                props: {
                  optionListName: 'positions',
                },
              },
            },
            inscriptionContentScript: {
              [ui]: {
                type: OptionListControlledInput,
                props: {
                  optionListName: 'scripts',
                },
              },
            },
            inscriptionContentType: {
              [ui]: {
                type: OptionListControlledInput,
                props: {
                  optionListName: 'inscriptionTypes',
                },
              },
            },
            inscriptionContentMethod: {
              [ui]: {
                type: TextInput,
              },
            },
            inscriptionContentInterpretation: {
              [ui]: {
                type: TextInput,
                props: {
                  multiline: true,
                },
              },
            },
            inscriptionContentTranslation: {
              [ui]: {
                type: TextInput,
              },
            },
            inscriptionContentTransliteration: {
              [ui]: {
                type: TextInput,
              },
            },
          },
        },
        nonTextualInscriptionGroupList: {
          [ui]: {
            type: CompoundInput,
          },
          nonTextualInscriptionGroup: {
            [ui]: {
              type: CompoundInput,
              props: {
                repeating: true,
              },
            },
            inscriptionDescription: {
              [ui]: {
                type: TextInput,
                props: {
                  multiline: true,
                },
              },
            },
            inscriptionDescriptionInscriber: {
              [ui]: {
                type: AuthorityControlledInput,
                props: {
                  authority: 'person/local,person/shared,organization/local,organization/shared',
                },
              },
            },
            inscriptionDescriptionDateGroup: {
              [ui]: {
                type: StructuredDateInput,
              },
            },
            inscriptionDescriptionPosition: {
              [ui]: {
                type: OptionListControlledInput,
                props: {
                  optionListName: 'positions',
                },
              },
            },
            inscriptionDescriptionType: {
              [ui]: {
                type: OptionListControlledInput,
                props: {
                  optionListName: 'inscriptionTypes',
                },
              },
            },
            inscriptionDescriptionMethod: {
              [ui]: {
                type: TextInput,
              },
            },
            inscriptionDescriptionInterpretation: {
              [ui]: {
                type: TextInput,
                props: {
                  multiline: true,
                },
              },
            },
          },
        },
        objectProductionDateGroupList: {
          [ui]: {
            type: CompoundInput,
          },
          objectProductionDateGroup: {
            [ui]: {
              type: StructuredDateInput,
              props: {
                repeating: true,
              },
            },
          },
        },
        techniqueGroupList: {
          [ui]: {
            type: CompoundInput,
          },
          techniqueGroup: {
            [ui]: {
              type: CompoundInput,
              props: {
                tabular: true,
                repeating: true,
              },
            },
            technique: {
              [ui]: {
                type: TextInput,
              },
            },
            techniqueType: {
              [ui]: {
                type: TextInput,
              },
            },
          },
        },
        objectProductionPlaceGroupList: {
          [ui]: {
            type: CompoundInput,
          },
          objectProductionPlaceGroup: {
            [ui]: {
              type: CompoundInput,
              props: {
                tabular: true,
                repeating: true,
              },
            },
            objectProductionPlace: {
              [ui]: {
                type: TextInput,
              },
            },
            objectProductionPlaceRole: {
              [ui]: {
                type: TextInput,
              },
            },
          },
        },
        objectProductionReasons: {
          [ui]: {
            type: CompoundInput,
          },
          objectProductionReason: {
            [ui]: {
              type: TextInput,
              props: {
                multiline: true,
                repeating: true,
              },
            },
          },
        },
        objectProductionPeopleGroupList: {
          [ui]: {
            type: CompoundInput,
          },
          objectProductionPeopleGroup: {
            [ui]: {
              type: CompoundInput,
              props: {
                tabular: true,
                repeating: true,
              },
            },
            objectProductionPeople: {
              [ui]: {
                type: TextInput,
              },
            },
            objectProductionPeopleRole: {
              [ui]: {
                type: TextInput,
              },
            },
          },
        },
        objectProductionPersonGroupList: {
          [ui]: {
            type: CompoundInput,
          },
          objectProductionPersonGroup: {
            [ui]: {
              type: CompoundInput,
              props: {
                tabular: true,
                repeating: true,
              },
            },
            objectProductionPerson: {
              [ui]: {
                type: AuthorityControlledInput,
                props: {
                  authority: 'person/local,person/shared',
                },
              },
            },
            objectProductionPersonRole: {
              [ui]: {
                type: TextInput,
              },
            },
          },
        },
        objectProductionOrganizationGroupList: {
          [ui]: {
            type: CompoundInput,
          },
          objectProductionOrganizationGroup: {
            [ui]: {
              type: CompoundInput,
              props: {
                tabular: true,
                repeating: true,
              },
            },
            objectProductionOrganization: {
              [ui]: {
                type: AuthorityControlledInput,
                props: {
                  authority: 'organization/local,organization/shared',
                },
              },
            },
            objectProductionOrganizationRole: {
              [ui]: {
                type: TextInput,
              },
            },
          },
        },
        objectProductionNote: {
          [ui]: {
            type: TextInput,
            props: {
              multiline: true,
            },
          },
        },
        assocActivityGroupList: {
          [ui]: {
            type: CompoundInput,
          },
          assocActivityGroup: {
            [ui]: {
              type: CompoundInput,
              props: {
                tabular: true,
                repeating: true,
              },
            },
            assocActivity: {
              [ui]: {
                type: TextInput,
              },
            },
            assocActivityType: {
              [ui]: {
                type: TextInput,
              },
            },
            assocActivityNote: {
              [ui]: {
                type: TextInput,
              },
            },
          },
        },
        assocObjectGroupList: {
          [ui]: {
            type: CompoundInput,
          },
          assocObjectGroup: {
            [ui]: {
              type: CompoundInput,
              props: {
                tabular: true,
                repeating: true,
              },
            },
            assocObject: {
              [ui]: {
                type: TextInput,
              },
            },
            assocObjectType: {
              [ui]: {
                type: TextInput,
              },
            },
            assocObjectNote: {
              [ui]: {
                type: TextInput,
              },
            },
          },
        },
        assocConceptGroupList: {
          [ui]: {
            type: CompoundInput,
          },
          assocConceptGroup: {
            [ui]: {
              type: CompoundInput,
              props: {
                tabular: true,
                repeating: true,
              },
            },
            assocConcept: {
              [ui]: {
                type: AuthorityControlledInput,
                props: {
                  authority: 'concept/associated',
                },
              },
            },
            assocConceptType: {
              [ui]: {
                type: TextInput,
              },
            },
            assocConceptNote: {
              [ui]: {
                type: TextInput,
              },
            },
          },
        },
        assocCulturalContextGroupList: {
          [ui]: {
            type: CompoundInput,
          },
          assocCulturalContextGroup: {
            [ui]: {
              type: CompoundInput,
              props: {
                tabular: true,
                repeating: true,
              },
            },
            assocCulturalContext: {
              [ui]: {
                type: TextInput,
              },
            },
            assocCulturalContextType: {
              [ui]: {
                type: TextInput,
              },
            },
            assocCulturalContextNote: {
              [ui]: {
                type: TextInput,
              },
            },
          },
        },
        assocOrganizationGroupList: {
          [ui]: {
            type: CompoundInput,
          },
          assocOrganizationGroup: {
            [ui]: {
              type: CompoundInput,
              props: {
                tabular: true,
                repeating: true,
              },
            },
            assocOrganization: {
              [ui]: {
                type: AuthorityControlledInput,
                props: {
                  authority: 'organization/local,organization/shared',
                },
              },
            },
            assocOrganizationType: {
              [ui]: {
                type: TextInput,
              },
            },
            assocOrganizationNote: {
              [ui]: {
                type: TextInput,
              },
            },
          },
        },
        assocPeopleGroupList: {
          [ui]: {
            type: CompoundInput,
          },
          assocPeopleGroup: {
            [ui]: {
              type: CompoundInput,
              props: {
                tabular: true,
                repeating: true,
              },
            },
            assocPeople: {
              [ui]: {
                type: TextInput,
              },
            },
            assocPeopleType: {
              [ui]: {
                type: TextInput,
              },
            },
            assocPeopleNote: {
              [ui]: {
                type: TextInput,
              },
            },
          },
        },
        assocPersonGroupList: {
          [ui]: {
            type: CompoundInput,
          },
          assocPersonGroup: {
            [ui]: {
              type: CompoundInput,
              props: {
                tabular: true,
                repeating: true,
              },
            },
            assocPerson: {
              [ui]: {
                type: AuthorityControlledInput,
                props: {
                  authority: 'person/local,person/shared',
                },
              },
            },
            assocPersonType: {
              [ui]: {
                type: TextInput,
              },
            },
            assocPersonNote: {
              [ui]: {
                type: TextInput,
              },
            },
          },
        },
        assocPlaceGroupList: {
          [ui]: {
            type: CompoundInput,
          },
          assocPlaceGroup: {
            [ui]: {
              type: CompoundInput,
              props: {
                tabular: true,
                repeating: true,
              },
            },
            assocPlace: {
              [ui]: {
                type: TextInput,
              },
            },
            assocPlaceType: {
              [ui]: {
                type: TextInput,
              },
            },
            assocPlaceNote: {
              [ui]: {
                type: TextInput,
              },
            },
          },
        },
        assocEventName: {
          [ui]: {
            type: TextInput,
          },
        },
        assocEventNameType: {
          [ui]: {
            type: TextInput,
          },
        },
        assocEventOrganizations: {
          [ui]: {
            type: CompoundInput,
          },
          assocEventOrganization: {
            [ui]: {
              type: AuthorityControlledInput,
              props: {
                authority: 'organization/local,organization/shared',
                repeating: true,
              },
            },
          },
        },
        assocEventPeoples: {
          [ui]: {
            type: CompoundInput,
          },
          assocEventPeople: {
            [ui]: {
              type: TextInput,
              props: {
                repeating: true,
              },
            },
          },
        },
        assocEventPersons: {
          [ui]: {
            type: CompoundInput,
          },
          assocEventPerson: {
            [ui]: {
              type: AuthorityControlledInput,
              props: {
                authority: 'person/local,person/shared',
                repeating: true,
              },
            },
          },
        },
        assocEventPlaces: {
          [ui]: {
            type: CompoundInput,
          },
          assocEventPlace: {
            [ui]: {
              type: TextInput,
              props: {
                repeating: true,
              },
            },
          },
        },
        assocEventNote: {
          [ui]: {
            type: TextInput,
          },
        },
        assocDateGroupList: {
          [ui]: {
            type: CompoundInput,
          },
          assocDateGroup: {
            [ui]: {
              type: CompoundInput,
              props: {
                tabular: true,
                repeating: true,
              },
            },
            assocStructuredDateGroup: {
              [ui]: {
                type: StructuredDateInput,
              },
            },
            assocDateType: {
              [ui]: {
                type: TextInput,
              },
            },
            assocDateNote: {
              [ui]: {
                type: TextInput,
              },
            },
          },
        },
        objectHistoryNote: {
          [ui]: {
            type: TextInput,
            props: {
              multiline: true,
            },
          },
        },
        usageGroupList: {
          [ui]: {
            type: CompoundInput,
          },
          usageGroup: {
            [ui]: {
              type: CompoundInput,
              props: {
                tabular: true,
                repeating: true,
              },
            },
            usage: {
              [ui]: {
                type: TextInput,
              },
            },
            usageNote: {
              [ui]: {
                type: TextInput,
              },
            },
          },
        },
        owners: {
          [ui]: {
            type: CompoundInput,
          },
          owner: {
            [ui]: {
              type: AuthorityControlledInput,
              props: {
                authority: 'person/local,person/shared,organization/local,organization/shared',
                repeating: true,
              },
            },
          },
        },
        ownershipDateGroupList: {
          [ui]: {
            type: CompoundInput,
          },
          ownershipDateGroup: {
            [ui]: {
              type: StructuredDateInput,
              props: {
                repeating: true,
              },
            },
          },
        },
        ownershipAccess: {
          [ui]: {
            type: OptionListControlledInput,
            props: {
              optionListName: 'ownershipAccessLevels',
            },
          },
        },
        ownershipCategory: {
          [ui]: {
            type: OptionListControlledInput,
            props: {
              optionListName: 'ownershipCategories',
            },
          },
        },
        ownershipPlace: {
          [ui]: {
            type: TextInput,
          },
        },
        ownershipExchangeMethod: {
          [ui]: {
            type: OptionListControlledInput,
            props: {
              optionListName: 'ownershipExchangeMethods',
            },
          },
        },
        ownershipExchangeNote: {
          [ui]: {
            type: TextInput,
          },
        },
        ownershipExchangePriceCurrency: {
          [ui]: {
            type: VocabularyControlledInput,
            props: {
              vocabularyName: 'currency',
            },
          },
        },
        ownershipExchangePriceValue: {
          [ui]: {
            type: TextInput,
          },
        },
        ownersPersonalExperience: {
          [ui]: {
            type: TextInput,
            props: {
              multiline: true,
            },
          },
        },
        ownersPersonalResponse: {
          [ui]: {
            type: TextInput,
            props: {
              multiline: true,
            },
          },
        },
        ownersReferences: {
          [ui]: {
            type: CompoundInput,
          },
          ownersReference: {
            [ui]: {
              type: TextInput,
              props: {
                repeating: true,
              },
            },
          },
        },
        ownersContributionNote: {
          [ui]: {
            type: TextInput,
            props: {
              multiline: true,
            },
          },
        },
        viewersRole: {
          [ui]: {
            type: TextInput,
          },
        },
        viewersPersonalExperience: {
          [ui]: {
            type: TextInput,
            props: {
              multiline: true,
            },
          },
        },
        viewersPersonalResponse: {
          [ui]: {
            type: TextInput,
            props: {
              multiline: true,
            },
          },
        },
        viewersReferences: {
          [ui]: {
            type: CompoundInput,
          },
          viewersReference: {
            [ui]: {
              type: TextInput,
              props: {
                repeating: true,
              },
            },
          },
        },
        viewersContributionNote: {
          [ui]: {
            type: TextInput,
            props: {
              multiline: true,
            },
          },
        },
        referenceGroupList: {
          [ui]: {
            type: CompoundInput,
          },
          referenceGroup: {
            [ui]: {
              type: CompoundInput,
              props: {
                tabular: true,
                repeating: true,
              },
            },
            reference: {
              [ui]: {
                type: AuthorityControlledInput,
                props: {
                  authority: 'citation/local,citation/shared,citation/worldcat',
                },
              },
            },
            referenceNote: {
              [ui]: {
                type: TextInput,
              },
            },
          },
        },
        fieldCollectionDateGroup: {
          [ui]: {
            type: StructuredDateInput,
          },
        },
        fieldCollectionMethods: {
          [ui]: {
            type: CompoundInput,
          },
          fieldCollectionMethod: {
            [ui]: {
              type: VocabularyControlledInput,
              props: {
                vocabularyName: 'collectionmethod',
                repeating: true,
              },
            },
          },
        },
        fieldCollectionNote: {
          [ui]: {
            type: TextInput,
            props: {
              multiline: true,
            },
          },
        },
        fieldCollectionNumber: {
          [ui]: {
            type: TextInput,
          },
        },
        fieldCollectionPlace: {
          [ui]: {
            type: AuthorityControlledInput,
            props: {
              authority: 'place/local,place/shared,place/tgn',
            },
          },
        },
        fieldCollectionSources: {
          [ui]: {
            type: CompoundInput,
          },
          fieldCollectionSource: {
            [ui]: {
              type: AuthorityControlledInput,
              props: {
                authority: 'person/local,person/shared',
                repeating: true,
              },
            },
          },
        },
        fieldCollectors: {
          [ui]: {
            type: CompoundInput,
          },
          fieldCollector: {
            [ui]: {
              type: AuthorityControlledInput,
              props: {
                authority: 'person/local,person/shared,organization/local,organization/shared',
                repeating: true,
              },
            },
          },
        },
        fieldColEventNames: {
          [ui]: {
            type: CompoundInput,
          },
          fieldColEventName: {
            [ui]: {
              type: TextInput,
              props: {
                repeating: true,
              },
            },
          },
        },
      },
    },
  };
};
