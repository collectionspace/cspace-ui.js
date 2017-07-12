import { defineMessages } from 'react-intl';
import { getDisplayName } from 'cspace-refname';
import { formatTimestamp } from '../../../helpers/formatHelpers';

export default {
  default: [
    {
      name: 'entryNumber',
      messages: defineMessages({
        label: {
          id: 'column.intake.default.entryNumber',
          defaultMessage: 'Intake entry number',
        },
      }),
      sortBy: 'intakes_common:entryNumber',
      width: 200,
    },
    {
      name: 'currentOwner',
      messages: defineMessages({
        label: {
          id: 'column.intake.default.currentOwner',
          defaultMessage: 'Current owner',
        },
      }),
      formatValue: value => getDisplayName(value),
      sortBy: 'intakes_common:currentOwner',
      width: 450,
    },
    {
      name: 'updatedAt',
      messages: defineMessages({
        label: {
          id: 'column.exhibition.default.updatedAt',
          defaultMessage: 'Updated',
        },
      }),
      formatValue: formatTimestamp,
      sortBy: 'collectionspace_core:updatedAt',
      width: 150,
    },
  ],
};
