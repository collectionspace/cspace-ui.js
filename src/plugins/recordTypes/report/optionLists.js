import { defineMessages } from 'react-intl';

export default {
  reportMimeTypes: {
    values: [
      'application/pdf',
      'text/html',
      'application/xml',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/csv',
      'text/tab-separated-values',
    ],
    messages: defineMessages({
      'application/pdf': {
        id: 'option.reportMimeTypes.application/pdf',
        defaultMessage: 'PDF',
      },
      'text/html': {
        id: 'option.reportMimeTypes.text/html',
        defaultMessage: 'HTML',
      },
      'application/xml': {
        id: 'option.reportMimeTypes.application/xml',
        defaultMessage: 'XML',
      },
      'application/vnd.ms-excel': {
        id: 'option.reportMimeTypes.application/vnd.ms-excel',
        defaultMessage: 'MS Excel (.xls)',
      },
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
        id: 'option.reportMimeTypes.application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        defaultMessage: 'MS Excel (.xlsx)',
      },
      'application/vnd.ms-powerpoint': {
        id: 'option.reportMimeTypes.application/vnd.ms-powerpoint',
        defaultMessage: 'MS PowerPoint (.ppt)',
      },
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': {
        id: 'option.reportMimeTypes.application/vnd.openxmlformats-officedocument.presentationml.presentation',
        defaultMessage: 'MS PowerPoint (.pptx)',
      },
      'application/msword': {
        id: 'option.reportMimeTypes.application/msword',
        defaultMessage: 'MS Word (.doc)',
      },
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
        id: 'option.reportMimeTypes.application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        defaultMessage: 'MS Word (.docx)',
      },
      'text/csv': {
        id: 'option.reportMimeTypes.text/csv',
        defaultMessage: 'CSV',
      },
      'text/tab-separated-values': {
        id: 'option.reportMimeTypes.text/tab-separated-values',
        defaultMessage: 'TSV',
      },
    }),
  },
  uocApprovalStatusMIMETypes: {
    values: [
      'application/pdf',
      'text/csv',
      'application/msword',
    ],
    messages: defineMessages({
      'application/pdf': {
        id: 'option.uocApprovalStatusMIMETypes.application/pdf.',
        defaultMessage: 'PDF',
      },
      'text/csv': {
        id: 'option.uocApprovalStatusMIMETypes.text/csv.',
        defaultMessage: 'CSV',
      },
      'application/msword': {
        id: 'option.uocApprovalStatusMIMETypes.application/msword.',
        defaultMessage: 'MS word',
      },
    }),
  },
};
