import { defineMessages } from 'react-intl';
import { getDisplayName } from 'cspace-refname';
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
      name: 'docNumber',
      messages: defineMessages({
        label: {
          id: 'column.procedure.docNumber',
          defaultMessage: 'Record',
        },
      }),
      // The value -might- be a refname.
      // FIXME: It could also be an option list value. How to tell?
      formatValue: value => getDisplayName(value) || value,
      width: 200,
    },
    {
      name: 'docName',
      messages: defineMessages({
        label: {
          id: 'column.procedure.docName',
          defaultMessage: 'Summary',
        },
      }),
      // The value -might- be a refname.
      // FIXME: It could also be an option list value. How to tell?
      formatValue: value => getDisplayName(value) || value,
      width: 300,
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
