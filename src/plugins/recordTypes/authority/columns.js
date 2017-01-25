import { defineMessages } from 'react-intl';
import { getRecordTypeConfigByServiceObjectName } from '../../../helpers/configHelpers';
import { formatLocalDateTime } from '../../../helpers/dateHelpers';

const formatServiceObjectName = (value, { intl, config }) => {
  const recordType = getRecordTypeConfigByServiceObjectName(config, value);

  if (recordType) {
    return intl.formatMessage(recordType.messages.record.recordNameTitle);
  }

  return `[ ${value.toLowerCase()} ]`;
};

export default {
  default: [
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
      formatValue: (value, formatterContext) =>
        formatServiceObjectName(value, formatterContext),
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
