import { defineMessages } from 'react-intl';
import { getDisplayName } from 'cspace-refname';

import {
  formatServiceObjectName,
  formatForeignSourceField,
} from '../../../helpers/formatHelpers';

export default {
  default: [
    {
      name: 'docNumber',
      messages: defineMessages({
        label: {
          id: 'column.refs.default.docNumber',
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
          id: 'column.refs.default.docName',
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
          id: 'column.refs.default.docType',
          defaultMessage: 'Type',
        },
      }),
      formatValue: (value, formatterContext) =>
        formatServiceObjectName(value, formatterContext),
      width: 150,
    },
    {
      name: 'sourceField',
      messages: defineMessages({
        label: {
          id: 'column.refs.default.sourceField',
          defaultMessage: 'Field',
        },
      }),
      formatValue: (value, formatterContext) =>
        formatForeignSourceField(value, formatterContext),
      width: 250,
    },
  ],
  narrow: [
    {
      name: 'docNumber',
      messages: defineMessages({
        label: {
          id: 'column.refs.narrow.docNumber',
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
          id: 'column.refs.narrow.docName',
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
          id: 'column.refs.narrow.docType',
          defaultMessage: 'Type',
        },
      }),
      formatValue: (value, formatterContext) =>
        formatServiceObjectName(value, formatterContext),
      width: 150,
    },
    {
      name: 'sourceField',
      messages: defineMessages({
        label: {
          id: 'column.refs.narrow.sourceField',
          defaultMessage: 'Field',
        },
      }),
      formatValue: (value, formatterContext) =>
        formatForeignSourceField(value, formatterContext),
      width: 250,
    },
  ],
};
