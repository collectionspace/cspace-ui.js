import { defineMessages } from 'react-intl';
import { getDisplayName } from 'cspace-refname';

import {
  formatTimestamp,
  formatServiceObjectName,
} from '../../../helpers/formatHelpers';

export default {
  default: [
    {
      name: 'docNumber',
      messages: defineMessages({
        label: {
          id: 'column.object.default.docNumber',
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
          id: 'column.object.default.docName',
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
          id: 'column.object.default.docType',
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
          id: 'column.object.default.updatedAt',
          defaultMessage: 'Updated',
        },
      }),
      formatValue: formatTimestamp,
      sortBy: 'collectionspace_core:updatedAt',
      width: 150,
    },
  ],
};
