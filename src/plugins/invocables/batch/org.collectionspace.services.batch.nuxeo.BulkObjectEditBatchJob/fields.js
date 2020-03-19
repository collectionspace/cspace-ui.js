import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    CompoundInput,
    AutocompleteInput,
    TextInput,
    OptionPickerInput,
  } = configContext.inputComponents;

  const {
    configKey: config,
  } = configContext.configHelpers;

  return {
    params: {
      [config]: {
        view: {
          type: CompoundInput,
        },
      },
      // core
      numberOfObjects: {
        [config]: {
          // dataType: DATA_TYPE_INT,
          messages: defineMessages({
            name: {
              id: 'field.BulkObjectEditBatchJob.numberOfObjects.name',
              defaultMessage: 'Number of objects',
            },
          }),
          view: {
            type: TextInput,
          },
        },
      },
      // core
      otherNumberList: {
        [config]: {
          view: {
            type: CompoundInput,
          },
        },
        otherNumber: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.BulkObjectEditBatchJob.otherNumber.name',
                defaultMessage: 'Other number',
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
          numberValue: {
            [config]: {
              messages: defineMessages({
                name: {
                  id: 'field.BulkObjectEditBatchJob.numberValue.name',
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
                  id: 'field.BulkObjectEditBatchJob.numberType.name',
                  defaultMessage: 'Type',
                },
              }),
              view: {
                type: OptionPickerInput,
                props: {
                  source: 'numberTypes',
                },
              },
            },
          },
        },
      },
      // core
      objectStatusList: {
        [config]: {
          view: {
            type: CompoundInput,
          },
        },
        objectStatus: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.BulkObjectEditBatchJob.objectStatus.name',
                defaultMessage: 'Object status',
              },
            }),
            repeating: true,
            view: {
              type: OptionPickerInput,
              props: {
                source: 'objectStatuses',
              },
            },
          },
        },
      },
      // core
      materialGroup: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.BulkObjectEditBatchJob.materialGroup.name',
              defaultMessage: 'Material',
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
        material: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.BulkObjectEditBatchJob.material.name',
                defaultMessage: 'Material',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
      },
      // core
      briefDescriptions: {
        [config]: {
          view: {
            type: CompoundInput,
          },
        },
        briefDescription: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.BulkObjectEditBatchJob.briefDescription.name',
                defaultMessage: 'Brief description',
              },
            }),
            repeating: true,
            view: {
              type: TextInput,
              props: {
                multiline: true,
              },
            },
          },
        },
      },
      // core
      objectNameGroup: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.BulkObjectEditBatchJob.objectNameGroup.name',
              defaultMessage: 'Object name',
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
        objectName: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.BulkObjectEditBatchJob.objectName.fullName',
                defaultMessage: 'Object name',
              },
              name: {
                id: 'field.BulkObjectEditBatchJob.objectName.name',
                defaultMessage: 'Name',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
      },
      // core
      responsibleDepartments: {
        [config]: {
          view: {
            type: CompoundInput,
          },
        },
        responsibleDepartment: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.BulkObjectEditBatchJob.responsibleDepartment.name',
                defaultMessage: 'Responsible department',
              },
            }),
            repeating: true,
            view: {
              type: OptionPickerInput,
              props: {
                source: 'departments',
              },
            },
          },
        },
      },
      // core
      fieldCollectionPlace: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.BulkObjectEditBatchJob.fieldCollectionPlace.name',
              defaultMessage: 'Field collection place',
            },
          }),
          view: {
            type: AutocompleteInput,
            props: {
              source: 'place/local,place/shared,place/tgn',
            },
          },
        },
      },
      // core
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
                id: 'field.BulkObjectEditBatchJob.fieldCollector.name',
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
      // core:  structured date
      fieldCollectionDate: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.BulkObjectEditBatchJob.fieldCollectionDate.name',
              defaultMessage: 'Field collection date',
            },
          }),
          view: {
            type: TextInput,
          },
        },
      },
      // core
      objectProductionPlaceGroup: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.BulkObjectEditBatchJob.objectProductionPlaceGroup.name',
              defaultMessage: 'Production place',
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
        objectProductionPlace: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.BulkObjectEditBatchJob.objectProductionPlace.fullName',
                defaultMessage: 'Production place',
              },
              name: {
                id: 'field.BulkObjectEditBatchJob.objectProductionPlace.name',
                defaultMessage: 'Place',
              },
            }),
            view: {
              type: TextInput,
            },
          },
        },
      },
      // core
      objectProductionPersonGroup: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.BulkObjectEditBatchJob.objectProductionPersonGroup.name',
              defaultMessage: 'Production person',
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
        objectProductionPerson: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.BulkObjectEditBatchJob.objectProductionPerson.fullName',
                defaultMessage: 'Production person',
              },
              name: {
                id: 'field.BulkObjectEditBatchJob.objectProductionPerson.name',
                defaultMessage: 'Person',
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
      // core: structured date
      objectProductionDate: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.BulkObjectEditBatchJob.objectProductionDate.name',
              defaultMessage: 'Field collection date',
            },
          }),
          view: {
            type: TextInput,
          },
        },
      },
      // core:  structured date
      contentDateGroup: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.BulkObjectEditBatchJob.contentDateGroup.name',
              defaultMessage: 'Date',
            },
          }),
          view: {
            type: TextInput,
          },
        },
      },
      // core
      contentPlaces: {
        [config]: {
          view: {
            type: CompoundInput,
          },
        },
        contentPlace: {
          [config]: {
            messages: defineMessages({
              name: {
                id: 'field.BulkObjectEditBatchJob.contentPlace.name',
                defaultMessage: 'Place',
              },
            }),
            repeating: true,
            view: {
              type: TextInput,
            },
          },
        },
      },
      // core
      assocPeopleGroup: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.BulkObjectEditBatchJob.assocPeopleGroup.name',
              defaultMessage: 'Associated people',
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
        assocPeople: {
          [config]: {
            messages: defineMessages({
              fullName: {
                id: 'field.BulkObjectEditBatchJob.assocPeople.fullName',
                defaultMessage: 'Associated people',
              },
              name: {
                id: 'field.BulkObjectEditBatchJob.assocPeople.name',
                defaultMessage: 'People',
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
