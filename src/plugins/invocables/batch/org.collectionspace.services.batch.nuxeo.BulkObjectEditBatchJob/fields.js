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
      numberValue: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.BulkObjectEditBatchJob.numberValue.name',
              defaultMessage: 'Other number',
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
              defaultMessage: 'Other number type',
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
      // core
      objectStatus: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.BulkObjectEditBatchJob.objectStatus.name',
              defaultMessage: 'Object status',
            },
          }),
          view: {
            type: OptionPickerInput,
            props: {
              source: 'objectStatuses',
            },
          },
        },
      },
      // core
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
      // core
      briefDescription: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.BulkObjectEditBatchJob.briefDescription.name',
              defaultMessage: 'Brief description',
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
      // core
      objectName: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.BulkObjectEditBatchJob.objectName.name',
              defaultMessage: 'Object name',
            },
          }),
          view: {
            type: TextInput,
          },
        },
      },
      // core
      responsibleDepartment: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.BulkObjectEditBatchJob.responsibleDepartment.name',
              defaultMessage: 'Responsible department',
            },
          }),
          view: {
            type: OptionPickerInput,
            props: {
              source: 'departments',
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
      fieldCollector: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.BulkObjectEditBatchJob.fieldCollector.name',
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
      // core
      objectProductionPlace: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.BulkObjectEditBatchJob.objectProductionPlace.name',
              defaultMessage: 'Production Place',
            },
          }),
          view: {
            type: TextInput,
          },
        },
      },
      // core
      objectProductionPerson: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.BulkObjectEditBatchJob.objectProductionPerson.name',
              defaultMessage: 'Production Person',
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
      contentPlace: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.BulkObjectEditBatchJob.contentPlace.name',
              defaultMessage: 'Content place',
            },
          }),
          view: {
            type: TextInput,
          },
        },
      },
      // core
      assocPeople: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.BulkObjectEditBatchJob.assocPeople.name',
              defaultMessage: 'Associated people',
            },
          }),
          view: {
            type: TextInput,
          },
        },
      },
    },
  };
};
