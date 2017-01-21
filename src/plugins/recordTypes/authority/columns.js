import { defineMessages } from 'react-intl';
import { getRecordTypeByServiceObjectName } from '../../../helpers/configHelpers';
import { formatLocalDateTime } from '../../../helpers/dateHelpers';

const formatServiceObjectName = (value, intl, config) => {
  const recordType = getRecordTypeByServiceObjectName(config, value);

  if (recordType) {
    return intl.formatMessage(recordType.messages.recordNameTitle);
  }

  return `[ ${value.toLowerCase()} ]`;
};

export default {
  search: [
    {
      name: 'docName',
      messages: defineMessages({
        label: {
          id: 'column.procedure.docName',
          defaultMessage: 'Term',
        },
      }),
      width: 200,
    },
    {
      name: 'docType',
      messages: defineMessages({
        label: {
          id: 'column.procedure.docType',
          defaultMessage: 'Type',
        },
      }),
      formatValue: (value, { intl, config }) =>
        formatServiceObjectName(value, intl, config),
      width: 150,
    },
    {
      name: 'updatedAt',
      messages: defineMessages({
        label: {
          id: 'column.procedure.updatedAt',
          defaultMessage: 'Updated',
        },
      }),
      formatValue: formatLocalDateTime,
      sortBy: 'collectionspace_core:updatedAt',
      width: 150,
    },
  ],
};
