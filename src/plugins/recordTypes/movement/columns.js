import { defineMessages } from 'react-intl';

export default (pluginContext) => {
  const {
    formatRefName,
    formatTimestamp,
    formatWorkflowStateIcon,
  } = pluginContext.formatHelpers;

  return {
    default: [
      {
        name: 'workflowState',
        formatValue: formatWorkflowStateIcon,
        width: 32,
        flexGrow: 0,
        flexShrink: 0,
      },
      {
        name: 'movementReferenceNumber',
        messages: defineMessages({
          label: {
            id: 'column.movement.default.movementReferenceNumber',
            defaultMessage: 'Reference number',
          },
        }),
        sortBy: 'movements_common:movementReferenceNumber',
        width: 250,
      },
      {
        name: 'currentLocation',
        messages: defineMessages({
          label: {
            id: 'column.movement.default.currentLocation',
            defaultMessage: 'Current location',
          },
        }),
        formatValue: formatRefName,
        sortBy: 'movements_common:currentLocation',
        width: 380,
      },
      {
        name: 'updatedAt',
        messages: defineMessages({
          label: {
            id: 'column.movement.default.updatedAt',
            defaultMessage: 'Updated',
          },
        }),
        formatValue: formatTimestamp,
        sortBy: 'collectionspace_core:updatedAt',
        width: 150,
      },
    ],
  };
};
