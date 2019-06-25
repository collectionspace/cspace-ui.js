import { defineMessages } from 'react-intl';

export default {
  reportMimeTypes: {
    values: [
      'application/pdf',
      'application/msword',
      'application/vnd.ms-excel',
      'application/vnd.ms-powerpoint',
      'text/csv',
      'text/tab-separated-values',
    ],
    messages: defineMessages({
      'application/pdf': {
        id: 'option.reportMimeTypes.application/pdf',
        defaultMessage: 'PDF',
      },
      'application/msword': {
        id: 'option.reportMimeTypes.application/msword',
        defaultMessage: 'MS Word',
      },
      'application/vnd.ms-excel': {
        id: 'option.reportMimeTypes.application/vnd.ms-excel',
        defaultMessage: 'MS Excel',
      },
      'application/vnd.ms-powerpoint': {
        id: 'option.reportMimeTypes.application/vnd.ms-powerpoint',
        defaultMessage: 'MS PowerPoint',
      },
      'text/csv': {
        id: 'option.reportMimeTypes.text/csv',
        defaultMessage: 'CSV (comma-separated values)',
      },
      'text/tab-separated-values': {
        id: 'option.reportMimeTypes.text/tab-separated-values',
        defaultMessage: 'TSV (tab-separated values)',
      },
    }),
  },
};
