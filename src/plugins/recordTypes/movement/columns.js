import { defineMessages } from 'react-intl';
import { getDisplayName } from 'cspace-refname';
import { formatTimestamp } from '../../../helpers/formatHelpers';

export default {
  default: [
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
      formatValue: value => getDisplayName(value),
      sortBy: 'movements_common:currentLocation',
      width: 400,
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
