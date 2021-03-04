import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    formatOption,
    formatRefNameAsVocabularyName,
    formatTimestamp,
    formatWorkflowStateIcon,
  } = configContext.formatHelpers;

  return {
    default: {
      workflowState: {
        flexGrow: 0,
        flexShrink: 0,
        formatValue: formatWorkflowStateIcon,
        order: 10,
        width: 32
      },
      idNumber: {
        messages: defineMessages({
          label: {
            id: 'column.audit.default.idNumber',
            defaultMessage: 'Identification number',
          },
        }),
        order: 20,
        sortBy: 'audit_common:idNumber',
        width: 250,
      },
      saveMessage: {
        messages: defineMessages({
          label: {
            id: 'column.audit.default.saveMessage',
            defaultMessage: 'Save message',
          },
        }),
        order: 20,
        sortBy: 'audit_common:saveMessage',
        width: 250,
      },
      originalValue: {
        messages: defineMessages({
          label: {
            id: 'column.audit.default.originalValue',
            defaultMessage: 'Original value',
          },
        }),
        order: 30,
        sortBy: 'audit_common:fieldChangedGroupList/0/originalValue',
        width: 250,
      },
      newValue: {
        messages: defineMessages({
          label: {
            id: 'column.audit.default newValue',
            defaultMessage: 'New value',
          },
        }),
        order: 40,
        sortBy: 'audit_common:fieldChangedGroupList/0/newValue',
        width: 250,
      },
      changeReason: {
        messages: defineMessages({
          label: {
            id: 'column.audit.default changeReason',
            defaultMessage: 'Change Reason',
          },
        }),
        order: 50,
        sortBy: 'audit_common:fieldChangedGroupList/0/changeReason',
        width: 250,
      },
    },
  };
};
