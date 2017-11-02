import { defineMessages } from 'react-intl';
import { formatRefName, formatTimestamp } from '../../../helpers/formatHelpers';

export default {
  default: [
    {
      name: 'acquisitionReferenceNumber',
      messages: defineMessages({
        label: {
          id: 'column.acquisition.default.acquisitionReferenceNumber',
          defaultMessage: 'Reference number',
        },
      }),
      sortBy: 'acquisitions_common:acquisitionReferenceNumber',
      width: 250,
    },
    {
      name: 'acquisitionSource',
      messages: defineMessages({
        label: {
          id: 'column.acquisition.default.acquisitionSource',
          defaultMessage: 'Acquisition source',
        },
      }),
      formatValue: formatRefName,
      sortBy: 'acquisitions_common:acquisitionSources/0/acquisitionSource',
      width: 400,
    },
    {
      name: 'updatedAt',
      messages: defineMessages({
        label: {
          id: 'column.acquisition.default.updatedAt',
          defaultMessage: 'Updated',
        },
      }),
      formatValue: formatTimestamp,
      sortBy: 'collectionspace_core:updatedAt',
      width: 150,
    },
  ],
};
