import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    formatDate,
    formatRefName,
    formatTimestamp,
    formatWorkflowStateIcon,
  } = configContext.formatHelpers;

  return {
    default: {
      workflowState: {
        flexGrow: 0,
        flexShrink: 0,
        formatValue: formatWorkflowStateIcon,
        order: 10,
        width: 32,
      },
      movementReferenceNumber: {
        messages: defineMessages({
          label: {
            id: 'column.movement.default.movementReferenceNumber',
            defaultMessage: 'Reference number',
          },
        }),
        order: 20,
        sortBy: 'movements_common:movementReferenceNumber',
        width: 230,
      },
      currentLocation: {
        formatValue: formatRefName,
        messages: defineMessages({
          label: {
            id: 'column.movement.default.currentLocation',
            defaultMessage: 'Current location',
          },
        }),
        order: 30,
        sortBy: 'movements_common:currentLocation',
        width: 250,
      },
      locationDate: {
        formatValue: formatDate,
        messages: defineMessages({
          label: {
            id: 'column.movement.default.locationDate',
            defaultMessage: 'Location date',
          },
        }),
        order: 35,
        sortBy: 'movements_common:locationDate',
        width: 150,
      },
      updatedAt: {
        formatValue: formatTimestamp,
        messages: defineMessages({
          label: {
            id: 'column.movement.default.updatedAt',
            defaultMessage: 'Updated',
          },
        }),
        order: 40,
        sortBy: 'collectionspace_core:updatedAt',
        width: 150,
      },
    },
  };
};
