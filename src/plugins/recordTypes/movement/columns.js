import { defineMessages } from 'react-intl';
import { formatRefName, formatTimestamp, formatWorkflowStateIcon } from '../../../helpers/formatHelpers';

export default {
  default: [
    {
      name: 'workflowState',
      formatValue: formatWorkflowStateIcon,
      width: 16,
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
