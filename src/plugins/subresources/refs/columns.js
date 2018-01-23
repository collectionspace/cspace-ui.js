import { defineMessages } from 'react-intl';

import {
  formatRefName,
  formatServiceObjectName,
  formatForeignSourceField,
} from '../../../helpers/formatHelpers';

export default {
  default: {
    docNumber: {
      // The value -might- be a refname.
      // FIXME: It could also be an option list value. How to tell?
      formatValue: value => formatRefName(value) || value,
      messages: defineMessages({
        label: {
          id: 'column.refs.default.docNumber',
          defaultMessage: 'Record',
        },
      }),
      order: 10,
      width: 200,
    },
    docName: {
      // The value -might- be a refname.
      // FIXME: It could also be an option list value. How to tell?
      formatValue: value => formatRefName(value) || value,
      messages: defineMessages({
        label: {
          id: 'column.refs.default.docName',
          defaultMessage: 'Summary',
        },
      }),
      order: 20,
      width: 300,
    },
    docType: {
      formatValue: formatServiceObjectName,
      messages: defineMessages({
        label: {
          id: 'column.refs.default.docType',
          defaultMessage: 'Type',
        },
      }),
      order: 30,
      width: 150,
    },
    sourceField: {
      formatValue: formatForeignSourceField,
      messages: defineMessages({
        label: {
          id: 'column.refs.default.sourceField',
          defaultMessage: 'Field',
        },
      }),
      order: 40,
      width: 250,
    },
  },
  narrow: {
    docNumber: {
      // The value -might- be a refname.
      // FIXME: It could also be an option list value. How to tell?
      formatValue: value => formatRefName(value) || value,
      messages: defineMessages({
        label: {
          id: 'column.refs.narrow.docNumber',
          defaultMessage: 'Record',
        },
      }),
      order: 10,
      width: 200,
    },
    docName: {
      // The value -might- be a refname.
      // FIXME: It could also be an option list value. How to tell?
      formatValue: value => formatRefName(value) || value,
      messages: defineMessages({
        label: {
          id: 'column.refs.narrow.docName',
          defaultMessage: 'Summary',
        },
      }),
      order: 20,
      width: 300,
    },
    docType: {
      formatValue: formatServiceObjectName,
      messages: defineMessages({
        label: {
          id: 'column.refs.narrow.docType',
          defaultMessage: 'Type',
        },
      }),
      order: 30,
      width: 150,
    },
    sourceField: {
      formatValue: formatForeignSourceField,
      messages: defineMessages({
        label: {
          id: 'column.refs.narrow.sourceField',
          defaultMessage: 'Field',
        },
      }),
      order: 40,
      width: 250,
    },
  },
};
