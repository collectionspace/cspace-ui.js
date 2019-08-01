import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    CompoundInput,
    TermPickerInput,
  } = configContext.inputComponents;

  const {
    configKey: config,
  } = configContext.configHelpers;

  return {
    document: {
      [config]: {
        view: {
          type: CompoundInput,
        },
      },
      inventoryStatus: {
        [config]: {
          messages: defineMessages({
            name: {
              id: 'field.batch.UpdateInventoryStatusBatchJob.inventoryStatus.name',
              defaultMessage: 'New inventory status',
            },
          }),
          repeating: true,
          view: {
            type: TermPickerInput,
            props: {
              source: 'inventorystatus',
            },
          },
        },
      },
    },
  };
};
