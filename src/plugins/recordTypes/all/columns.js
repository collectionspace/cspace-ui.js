import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    formatRefName,
    formatTimestamp,
    formatServiceObjectName,
    formatWorkflowStateIcon,
  } = configContext.formatHelpers;

  return {
    default: {
      workflowState: {
        flexGrow: 0,
        flexShrink: 0,
        formatValue: formatWorkflowStateIcon,
        order: 10,
        width: 32,
      },
      docNumber: {
        // The value -might- be a refname.
        // FIXME: It could also be an option list value. How to tell?
        formatValue: (value) => formatRefName(value) || value,
        messages: defineMessages({
          label: {
            id: 'column.all.default.docNumber',
            defaultMessage: 'Record',
          },
        }),
        order: 20,
        width: 200,
      },
      docName: {
        // The value -might- be a refname.
        // FIXME: It could also be an option list value. How to tell?
        formatValue: (value) => formatRefName(value) || value,
        messages: defineMessages({
          label: {
            id: 'column.all.default.docName',
            defaultMessage: 'Summary',
          },
        }),
        order: 30,
        width: 300,
      },
      docType: {
        formatValue: formatServiceObjectName,
        messages: defineMessages({
          label: {
            id: 'column.all.default.docType',
            defaultMessage: 'Type',
          },
        }),
        order: 40,
        width: 150,
      },
      updatedAt: {
        formatValue: formatTimestamp,
        messages: defineMessages({
          label: {
            id: 'column.all.default.updatedAt',
            defaultMessage: 'Updated',
          },
        }),
        order: 50,
        sortBy: 'collectionspace_core:updatedAt',
        width: 150,
      },
    },
  };
};
