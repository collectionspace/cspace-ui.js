export default (pluginContext) => {
  const {
    DATA_TYPE_DATETIME,
  } = pluginContext.dataTypes;

  const {
    TextInput,
    DateInput,
  } = pluginContext.inputComponents;

  return {
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
  }
};
