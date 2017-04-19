import { defineMessages } from 'react-intl';

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
    configKey: config,
  } = pluginContext.configHelpers;

  const {
    DATA_TYPE_LIST,
    DATA_TYPE_INT,
    DATA_TYPE_FLOAT,
    DATA_TYPE_DATETIME,
  } = pluginContext.dataTypes;

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
      'ns2:collectionobjects_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/collectionobject',
          },
        },
        objectNumber: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.objectNumber.name',
                defaultMessage: 'Identification number',
              },
            }),
            searchView: {
              type: TextInput,
            },
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
            dataType: DATA_TYPE_INT,
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.numberOfObjects.name',
                defaultMessage: 'Number of objects',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        otherNumberList: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.otherNumberList.name',
                defaultMessage: 'Other number',
              },
            }),
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
            numberValue: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.numberValue.name',
                    defaultMessage: 'Number',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            numberType: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.numberType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: OptionListControlledInput,
                  props: {
                    optionListName: 'numberTypes',
                  },
                },
              },
            },
          },
        },
        responsibleDepartments: {
          [config]: {
            dataType: DATA_TYPE_LIST,
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.responsibleDepartments.name',
                defaultMessage: 'Responsible department',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          responsibleDepartment: {
            [config]: {
              messages: defineMessages({
                fullName: {
                  id: 'field.collectionobjects_common.responsibleDepartment.fullName',
                  defaultMessage: 'Responsible department',
                },
              }),
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
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.collection.name',
                defaultMessage: 'Collection',
              },
            }),
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
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.recordStatus.name',
                defaultMessage: 'Record status',
              },
            }),
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
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.briefDescriptions.name',
                defaultMessage: 'Brief description',
              },
            }),
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
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.distinguishingFeatures.name',
                defaultMessage: 'Distinguishing features',
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
        comments: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.comments.name',
                defaultMessage: 'Comment',
              },
            }),
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
            cloneable: false,
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.computedCurrentLocation.name',
                defaultMessage: 'Computed current location',
              },
            }),
            view: {
              type: AuthorityControlledInput,
              props: {
                authority: 'location/local,location/offsite,organization/local,organization/shared',
                readOnly: true,
              },
            },
          },
        },
        titleGroupList: {
          [config]: {
            dataType: DATA_TYPE_LIST,
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.titleGroupList.name',
                defaultMessage: 'Title',
              },
            }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.title.name',
                    defaultMessage: 'Title',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            titleLanguage: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.titleLanguage.name',
                    defaultMessage: 'Language',
                  },
                }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.titleTranslationSubGroupList.name',
                    defaultMessage: 'Translation',
                  },
                }),
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
                    messages: defineMessages({
                      name: {
                        id: 'field.collectionobjects_common.titleTranslation.name',
                        defaultMessage: 'Translation',
                      },
                    }),
                    view: {
                      type: TextInput,
                    },
                  },
                },
                titleTranslationLanguage: {
                  [config]: {
                    messages: defineMessages({
                      name: {
                        id: 'field.collectionobjects_common.titleTranslationLanguage.name',
                        defaultMessage: 'Language',
                      },
                    }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.titleType.name',
                    defaultMessage: 'Type',
                  },
                }),
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
            dataType: DATA_TYPE_LIST,
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.objectNameList.name',
                defaultMessage: 'Object name',
              },
            }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.objectName.name',
                    defaultMessage: 'Name',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            objectNameCurrency: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.objectNameCurrency.name',
                    defaultMessage: 'Currency',
                  },
                }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.objectNameLevel.name',
                    defaultMessage: 'Level',
                  },
                }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.objectNameSystem.name',
                    defaultMessage: 'System',
                  },
                }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.objectNameType.name',
                    defaultMessage: 'Type',
                  },
                }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.objectNameLanguage.name',
                    defaultMessage: 'Language',
                  },
                }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.objectNameNote.name',
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
        copyNumber: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.copyNumber.name',
                defaultMessage: 'Copy number',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        objectStatusList: {
          [config]: {
            dataType: DATA_TYPE_LIST,
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.objectStatusList.name',
                defaultMessage: 'Object status',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          objectStatus: {
            [config]: {
              messages: defineMessages({
                fullName: {
                  id: 'field.collectionobjects_common.objectStatus.fullName',
                  defaultMessage: 'Object status',
                },
              }),
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
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.sex.name',
                defaultMessage: 'Sex',
              },
            }),
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
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.phase.name',
                defaultMessage: 'Phase',
              },
            }),
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
            dataType: DATA_TYPE_LIST,
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.forms.name',
                defaultMessage: 'Form',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          form: {
            [config]: {
              messages: defineMessages({
                fullName: {
                  id: 'field.collectionobjects_common.form.fullName',
                  defaultMessage: 'Form',
                },
              }),
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
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.editionNumber.name',
                defaultMessage: 'Edition number',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        age: {
          [config]: {
            dataType: DATA_TYPE_INT,
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.age.name',
                defaultMessage: 'Age',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        ageQualifier: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.ageQualifier.name',
                defaultMessage: 'Qualifier',
              },
            }),
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
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.ageUnit.name',
                defaultMessage: 'Unit',
              },
            }),
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
            dataType: DATA_TYPE_LIST,
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.styles.name',
                defaultMessage: 'Style',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          style: {
            [config]: {
              messages: defineMessages({
                fullName: {
                  id: 'field.collectionobjects_common.style.fullName',
                  defaultMessage: 'Style',
                },
              }),
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
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.colors.name',
                defaultMessage: 'Color',
              },
            }),
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
            dataType: DATA_TYPE_LIST,
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.materialGroupList.name',
                defaultMessage: 'Material',
              },
            }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.material.name',
                    defaultMessage: 'Material',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            materialComponent: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.collectionobjects_common.materialComponent.fullName',
                    defaultMessage: 'Material component',
                  },
                  name: {
                    id: 'field.collectionobjects_common.materialComponent.name',
                    defaultMessage: 'Component',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            materialComponentNote: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.collectionobjects_common.materialComponentNote.fullName',
                    defaultMessage: 'Material component note',
                  },
                  name: {
                    id: 'field.collectionobjects_common.materialComponentNote.name',
                    defaultMessage: 'Component note',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            materialName: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.collectionobjects_common.materialName.fullName',
                    defaultMessage: 'Material name',
                  },
                  name: {
                    id: 'field.collectionobjects_common.materialName.name',
                    defaultMessage: 'Name',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            materialSource: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.collectionobjects_common.materialSource.fullName',
                    defaultMessage: 'Material source',
                  },
                  name: {
                    id: 'field.collectionobjects_common.materialSource.name',
                    defaultMessage: 'Source',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        physicalDescription: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.physicalDescription.name',
                defaultMessage: 'Physical description',
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
        objectComponentGroupList: {
          [config]: {
            dataType: DATA_TYPE_LIST,
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.objectComponentGroupList.name',
                defaultMessage: 'Object component',
              },
            }),
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
                messages: defineMessages({
                  fullName: {
                    id: 'field.collectionobjects_common.objectComponentName.fullName',
                    defaultMessage: 'Object component name',
                  },
                  name: {
                    id: 'field.collectionobjects_common.objectComponentName.name',
                    defaultMessage: 'Name',
                  },
                }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.objectComponentInformation.name',
                    defaultMessage: 'Information',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        technicalAttributeGroupList: {
          [config]: {
            dataType: DATA_TYPE_LIST,
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.technicalAttributeGroupList.name',
                defaultMessage: 'Technical attribute',
              },
            }),
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
                messages: defineMessages({
                  fullName: {
                    id: 'field.collectionobjects_common.technicalAttribute.fullName',
                    defaultMessage: 'Technical attribute',
                  },
                  name: {
                    id: 'field.collectionobjects_common.technicalAttribute.name',
                    defaultMessage: 'Attribute',
                  },
                }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.technicalAttributeMeasurement.name',
                    defaultMessage: 'Measurement',
                  },
                }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.technicalAttributeMeasurementUnit.name',
                    defaultMessage: 'Unit',
                  },
                }),
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
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.measuredPartGroupList.name',
                defaultMessage: 'Dimensions',
              },
            }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.measuredPart.name',
                    defaultMessage: 'Part',
                  },
                }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.dimensionSummary.name',
                    defaultMessage: 'Summary',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            dimensionSubGroupList: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.dimensionSubGroupList.name',
                    defaultMessage: 'Measurements',
                  },
                }),
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
                    messages: defineMessages({
                      name: {
                        id: 'field.collectionobjects_common.dimension.name',
                        defaultMessage: 'Dimension',
                      },
                    }),
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
                    messages: defineMessages({
                      name: {
                        id: 'field.collectionobjects_common.measuredBy.name',
                        defaultMessage: 'Measured by',
                      },
                    }),
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
                    messages: defineMessages({
                      name: {
                        id: 'field.collectionobjects_common.measurementMethod.name',
                        defaultMessage: 'Method',
                      },
                    }),
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
                    messages: defineMessages({
                      name: {
                        id: 'field.collectionobjects_common.value.name',
                        defaultMessage: 'Value',
                      },
                    }),
                    view: {
                      type: TextInput,
                    },
                  },
                },
                measurementUnit: {
                  [config]: {
                    messages: defineMessages({
                      name: {
                        id: 'field.collectionobjects_common.measurementUnit.name',
                        defaultMessage: 'Unit',
                      },
                    }),
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
                    messages: defineMessages({
                      name: {
                        id: 'field.collectionobjects_common.valueQualifier.name',
                        defaultMessage: 'Qualifier',
                      },
                    }),
                    view: {
                      type: TextInput,
                    },
                  },
                },
                valueDate: {
                  [config]: {
                    messages: defineMessages({
                      name: {
                        id: 'field.collectionobjects_common.valueDate.name',
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
          },
        },
        contentDescription: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.contentDescription.name',
                defaultMessage: 'Description',
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
        contentLanguages: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.contentLanguages.name',
                defaultMessage: 'Language',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          contentLanguage: {
            [config]: {
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
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.contentActivities.name',
                defaultMessage: 'Activity',
              },
            }),
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
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.contentConcepts.name',
                defaultMessage: 'Concept',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          contentConcept: {
            [config]: {
              messages: defineMessages({
                fullName: {
                  id: 'field.collectionobjects_common.contentConcept.fullName',
                  defaultMessage: 'Content concept',
                },
                name: {
                  id: 'field.collectionobjects_common.contentConcept.name',
                  defaultMessage: 'Concept',
                },
              }),
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
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.contentDateGroup.name',
                defaultMessage: 'Date',
              },
            }),
            view: {
              type: StructuredDateInput,
            },
          },
        },
        contentPositions: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.contentPositions.name',
                defaultMessage: 'Position',
              },
            }),
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
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.contentObjectGroupList.name',
                defaultMessage: 'Object',
              },
            }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.contentObject.name',
                    defaultMessage: 'Name',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            contentObjectType: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.contentObjectType.name',
                    defaultMessage: 'Type',
                  },
                }),
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
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.contentPeoples.name',
                defaultMessage: 'People',
              },
            }),
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
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.contentPersons.name',
                defaultMessage: 'Person',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          contentPerson: {
            [config]: {
              messages: defineMessages({
                fullName: {
                  id: 'field.collectionobjects_common.contentPerson.fullName',
                  defaultMessage: 'Content person',
                },
                name: {
                  id: 'field.collectionobjects_common.contentPerson.name',
                  defaultMessage: 'Person',
                },
              }),
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
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.contentPlaces.name',
                defaultMessage: 'Place',
              },
            }),
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
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.contentScripts.name',
                defaultMessage: 'Script',
              },
            }),
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
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.contentOrganizations.name',
                defaultMessage: 'Organization',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          contentOrganization: {
            [config]: {
              messages: defineMessages({
                fullName: {
                  id: 'field.collectionobjects_common.contentOrganization.fullName',
                  defaultMessage: 'Content organization',
                },
                name: {
                  id: 'field.collectionobjects_common.contentOrganization.name',
                  defaultMessage: 'Organization',
                },
              }),
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
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.contentEventNameGroupList.name',
                defaultMessage: 'Event',
              },
            }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.contentEventName.name',
                    defaultMessage: 'Name',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            contentEventNameType: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.contentEventNameType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        contentOtherGroupList: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.contentOtherGroupList.name',
                defaultMessage: 'Other',
              },
            }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.contentOther.name',
                    defaultMessage: 'Name',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            contentOtherType: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.contentOtherType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        contentNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.contentNote.name',
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.inscriptionContent.name',
                    defaultMessage: 'Inscription content',
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
            inscriptionContentInscriber: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.collectionobjects_common.inscriptionContentInscriber.fullName',
                    defaultMessage: 'Textual inscription inscriber',
                  },
                  name: {
                    id: 'field.collectionobjects_common.inscriptionContentInscriber.name',
                    defaultMessage: 'Inscriber',
                  },
                }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.inscriptionContentLanguage.name',
                    defaultMessage: 'Language',
                  },
                }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.inscriptionContentDateGroup.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: StructuredDateInput,
                },
              },
            },
            inscriptionContentPosition: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.inscriptionContentPosition.name',
                    defaultMessage: 'Position',
                  },
                }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.inscriptionContentScript.name',
                    defaultMessage: 'Script',
                  },
                }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.inscriptionContentType.name',
                    defaultMessage: 'Type',
                  },
                }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.inscriptionContentMethod.name',
                    defaultMessage: 'Method',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            inscriptionContentInterpretation: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.inscriptionContentInterpretation.name',
                    defaultMessage: 'Interpretation',
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
            inscriptionContentTranslation: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.inscriptionContentTranslation.name',
                    defaultMessage: 'Translation',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            inscriptionContentTransliteration: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.inscriptionContentTransliteration.name',
                    defaultMessage: 'Transliteration',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        nonTextualInscriptionGroupList: {
          [config]: {
            dataType: DATA_TYPE_LIST,
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.inscriptionDescription.name',
                    defaultMessage: 'Inscription description',
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
            inscriptionDescriptionInscriber: {
              [config]: {
                messages: defineMessages({
                  fullName: {
                    id: 'field.collectionobjects_common.inscriptionDescriptionInscriber.fullName',
                    defaultMessage: 'Non-textual inscription inscriber',
                  },
                  name: {
                    id: 'field.collectionobjects_common.inscriptionDescriptionInscriber.name',
                    defaultMessage: 'Inscriber',
                  },
                }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.inscriptionDescriptionDateGroup.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: StructuredDateInput,
                },
              },
            },
            inscriptionDescriptionPosition: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.inscriptionDescriptionPosition.name',
                    defaultMessage: 'Position',
                  },
                }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.inscriptionDescriptionType.name',
                    defaultMessage: 'Type',
                  },
                }),
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
                messages: defineMessages({
                  fullName: {
                    id: 'field.collectionobjects_common.inscriptionDescriptionMethod.fullName',
                    defaultMessage: 'Non-textual inscription method',
                  },
                  name: {
                    id: 'field.collectionobjects_common.inscriptionDescriptionMethod.name',
                    defaultMessage: 'Method',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            inscriptionDescriptionInterpretation: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.inscriptionDescriptionInterpretation.name',
                    defaultMessage: 'Interpretation',
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
        objectProductionDateGroupList: {
          [config]: {
            dataType: DATA_TYPE_LIST,
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.objectProductionDateGroupList.name',
                defaultMessage: 'Production date',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          objectProductionDateGroup: {
            [config]: {
              messages: defineMessages({
                fullName: {
                  id: 'field.collectionobjects_common.objectProductionDateGroup.fullName',
                  defaultMessage: 'Production date',
                },
              }),
              searchView: {
                type: DateInput,
              },
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
            dataType: DATA_TYPE_LIST,
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.techniqueGroupList.name',
                defaultMessage: 'Production technique',
              },
            }),
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
                messages: defineMessages({
                  fullName: {
                    id: 'field.collectionobjects_common.technique.fullName',
                    defaultMessage: 'Production technique',
                  },
                  name: {
                    id: 'field.collectionobjects_common.technique.name',
                    defaultMessage: 'Technique',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            techniqueType: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.techniqueType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        objectProductionPlaceGroupList: {
          [config]: {
            dataType: DATA_TYPE_LIST,
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.objectProductionPlaceGroupList.name',
                defaultMessage: 'Production place',
              },
            }),
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
                messages: defineMessages({
                  fullName: {
                    id: 'field.collectionobjects_common.objectProductionPlace.fullName',
                    defaultMessage: 'Production place',
                  },
                  name: {
                    id: 'field.collectionobjects_common.objectProductionPlace.name',
                    defaultMessage: 'Place',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            objectProductionPlaceRole: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.objectProductionPlaceRole.name',
                    defaultMessage: 'Role',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        objectProductionReasons: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.objectProductionReasons.name',
                defaultMessage: 'Production reason',
              },
            }),
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
            dataType: DATA_TYPE_LIST,
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.objectProductionPeopleGroupList.name',
                defaultMessage: 'Production people',
              },
            }),
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
                messages: defineMessages({
                  fullName: {
                    id: 'field.collectionobjects_common.objectProductionPeople.fullName',
                    defaultMessage: 'Production people',
                  },
                  name: {
                    id: 'field.collectionobjects_common.objectProductionPeople.name',
                    defaultMessage: 'People',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            objectProductionPeopleRole: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.objectProductionPeopleRole.name',
                    defaultMessage: 'Role',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        objectProductionPersonGroupList: {
          [config]: {
            dataType: DATA_TYPE_LIST,
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.objectProductionPersonGroupList.name',
                defaultMessage: 'Production person',
              },
            }),
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
                messages: defineMessages({
                  fullName: {
                    id: 'field.collectionobjects_common.objectProductionPerson.fullName',
                    defaultMessage: 'Production person',
                  },
                  name: {
                    id: 'field.collectionobjects_common.objectProductionPerson.name',
                    defaultMessage: 'Person',
                  },
                }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.objectProductionPersonRole.name',
                    defaultMessage: 'Role',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        objectProductionOrganizationGroupList: {
          [config]: {
            dataType: DATA_TYPE_LIST,
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.objectProductionOrganizationGroupList.name',
                defaultMessage: 'Production organization',
              },
            }),
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
                messages: defineMessages({
                  fullName: {
                    id: 'field.collectionobjects_common.objectProductionOrganization.fullName',
                    defaultMessage: 'Production organization',
                  },
                  name: {
                    id: 'field.collectionobjects_common.objectProductionOrganization.name',
                    defaultMessage: 'Organization',
                  },
                }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.objectProductionOrganizationRole.name',
                    defaultMessage: 'Role',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
          },
        },
        objectProductionNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.objectProductionNote.name',
                defaultMessage: 'Production note',
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
        assocActivityGroupList: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.assocActivityGroupList.name',
                defaultMessage: 'Associated activity',
              },
            }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.assocActivity.name',
                    defaultMessage: 'Activity',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            assocActivityType: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.assocActivityType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            assocActivityNote: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.assocActivityNote.name',
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
        assocObjectGroupList: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.assocObjectGroupList.name',
                defaultMessage: 'Associated object',
              },
            }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.assocObject.name',
                    defaultMessage: 'Object',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            assocObjectType: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.assocObjectType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            assocObjectNote: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.assocObjectNote.name',
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
        assocConceptGroupList: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.assocConceptGroupList.name',
                defaultMessage: 'Associated concept',
              },
            }),
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
                messages: defineMessages({
                  fullName: {
                    id: 'field.collectionobjects_common.assocConcept.fullName',
                    defaultMessage: 'Associated concept',
                  },
                  name: {
                    id: 'field.collectionobjects_common.assocConcept.name',
                    defaultMessage: 'Concept',
                  },
                }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.assocConceptType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            assocConceptNote: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.assocConceptNote.name',
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
        assocCulturalContextGroupList: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.assocCulturalContextGroupList.name',
                defaultMessage: 'Associated cultural affinity',
              },
            }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.assocCulturalContext.name',
                    defaultMessage: 'Cultural affinity',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            assocCulturalContextType: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.assocCulturalContextType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            assocCulturalContextNote: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.assocCulturalContextNote.name',
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
        assocOrganizationGroupList: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.assocOrganizationGroupList.name',
                defaultMessage: 'Associated organization',
              },
            }),
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
                messages: defineMessages({
                  fullName: {
                    id: 'field.collectionobjects_common.assocOrganization.fullName',
                    defaultMessage: 'Associated organization',
                  },
                  name: {
                    id: 'field.collectionobjects_common.assocOrganization.name',
                    defaultMessage: 'Organization',
                  },
                }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.assocOrganizationType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            assocOrganizationNote: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.assocOrganizationNote.name',
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
        assocPeopleGroupList: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.assocPeopleGroupList.name',
                defaultMessage: 'Associated people',
              },
            }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.assocPeople.name',
                    defaultMessage: 'People',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            assocPeopleType: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.assocPeopleType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            assocPeopleNote: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.assocPeopleNote.name',
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
        assocPersonGroupList: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.assocPersonGroupList.name',
                defaultMessage: 'Associated person',
              },
            }),
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
                messages: defineMessages({
                  fullName: {
                    id: 'field.collectionobjects_common.assocPerson.fullName',
                    defaultMessage: 'Associated person',
                  },
                  name: {
                    id: 'field.collectionobjects_common.assocPerson.name',
                    defaultMessage: 'Person',
                  },
                }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.assocPersonType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            assocPersonNote: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.assocPersonNote.name',
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
        assocPlaceGroupList: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.assocPlaceGroupList.name',
                defaultMessage: 'Associated place',
              },
            }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.assocPlace.name',
                    defaultMessage: 'Place',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            assocPlaceType: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.assocPlaceType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            assocPlaceNote: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.assocPlaceNote.name',
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
        assocEventName: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.assocEventName.name',
                defaultMessage: 'Event',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        assocEventNameType: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.assocEventNameType.name',
                defaultMessage: 'Type',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        assocEventOrganizations: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.assocEventOrganizations.name',
                defaultMessage: 'Associated event organization',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          assocEventOrganization: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.collectionobjects_common.assocEventOrganization.name',
                  defaultMessage: 'Associated event organization',
                },
              }),
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
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.assocEventPeoples.name',
                defaultMessage: 'Associated event people',
              },
            }),
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
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.assocEventPersons.name',
                defaultMessage: 'Associated event person',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          assocEventPerson: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.collectionobjects_common.assocEventPerson.name',
                  defaultMessage: 'Associated event person',
                },
              }),
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
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.assocEventPlaces.name',
                defaultMessage: 'Associated event place',
              },
            }),
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
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.assocEventNote.name',
                defaultMessage: 'Associated event note',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        assocDateGroupList: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.assocDateGroupList.name',
                defaultMessage: 'Associated date',
              },
            }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.assocStructuredDateGroup.name',
                    defaultMessage: 'Date',
                  },
                }),
                view: {
                  type: StructuredDateInput,
                },
              },
            },
            assocDateType: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.assocDateType.name',
                    defaultMessage: 'Type',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            assocDateNote: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.assocDateNote.name',
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
        objectHistoryNote: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.objectHistoryNote.name',
                defaultMessage: 'Object history note',
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
        usageGroupList: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.usageGroupList.name',
                defaultMessage: 'Usage',
              },
            }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.usage.name',
                    defaultMessage: 'Usage',
                  },
                }),
                view: {
                  type: TextInput,
                },
              },
            },
            usageNote: {
              [config]: {
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.usageNote.name',
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
        owners: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.owners.name',
                defaultMessage: 'Owner',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          owner: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.collectionobjects_common.owner.name',
                  defaultMessage: 'Owner',
                },
              }),
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
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.ownershipDateGroupList.name',
                defaultMessage: 'Ownership date',
              },
            }),
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
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.ownershipAccess.name',
                defaultMessage: 'Ownership access',
              },
            }),
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
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.ownershipCategory.name',
                defaultMessage: 'Ownership category',
              },
            }),
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
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.ownershipPlace.name',
                defaultMessage: 'Ownership place',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        ownershipExchangeMethod: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.ownershipExchangeMethod.name',
                defaultMessage: 'Method',
              },
            }),
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
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.ownershipExchangeNote.name',
                defaultMessage: 'Note',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        ownershipExchangePriceCurrency: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.ownershipExchangePriceCurrency.name',
                defaultMessage: 'Currency',
              },
            }),
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
            dataType: DATA_TYPE_FLOAT,
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.ownershipExchangePriceValue.name',
                defaultMessage: 'Price',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        ownersPersonalExperience: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.ownersPersonalExperience.name',
                defaultMessage: 'Owner\'s personal experience',
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
        ownersPersonalResponse: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.ownersPersonalResponse.name',
                defaultMessage: 'Owner\'s personal response',
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
        ownersReferences: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.ownersReferences.name',
                defaultMessage: 'Owner\'s reference',
              },
            }),
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
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.ownersContributionNote.name',
                defaultMessage: 'Owner\'s contribution note',
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
        viewersRole: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.viewersRole.name',
                defaultMessage: 'Viewer\'s role',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
        viewersPersonalExperience: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.viewersPersonalExperience.name',
                defaultMessage: 'Viewer\'s personal experience',
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
        viewersPersonalResponse: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.viewersPersonalResponse.name',
                defaultMessage: 'Viewer\'s personal response',
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
        viewersReferences: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.viewersReferences.name',
                defaultMessage: 'Viewer\'s reference',
              },
            }),
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
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.viewersContributionNote.name',
                defaultMessage: 'Viewer\'s contribution note',
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.reference.name',
                    defaultMessage: 'Reference',
                  },
                }),
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
                messages: defineMessages({
                  name: {
                    id: 'field.collectionobjects_common.referenceNote.name',
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
        fieldCollectionDateGroup: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.fieldCollectionDateGroup.name',
                defaultMessage: 'Field collection date',
              },
            }),
            view: {
              type: StructuredDateInput,
            },
          },
        },
        fieldCollectionMethods: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.fieldCollectionMethods.name',
                defaultMessage: 'Field collection method',
              },
            }),
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
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.fieldCollectionNote.name',
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
                id: 'field.collectionobjects_common.fieldCollectionNumber.name',
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
                id: 'field.collectionobjects_common.fieldCollectionPlace.name',
                defaultMessage: 'Field collection place',
              },
            }),
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
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.fieldCollectionSources.name',
                defaultMessage: 'Field collection source',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          fieldCollectionSource: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.collectionobjects_common.fieldCollectionSource.name',
                  defaultMessage: 'Field collection source',
                },
              }),
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
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.fieldCollectors.name',
                defaultMessage: 'Field collection collector',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          fieldCollector: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.collectionobjects_common.fieldCollector.name',
                  defaultMessage: 'Field collection collector',
                },
              }),
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
            dataType: DATA_TYPE_LIST,
            messages: defineMessages({
              name: {
                id: 'field.collectionobjects_common.fieldColEventNames.name',
                defaultMessage: 'Field collection event name',
              },
            }),
            view: {
              type: CompoundInput,
            },
          },
          fieldColEventName: {
            [config]: {
              messages: defineMessages({
                fullName: {
                  id: 'field.collectionobjects_common.fieldColEventName.fullName',
                  defaultMessage: 'Field collection event name',
                },
              }),
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
