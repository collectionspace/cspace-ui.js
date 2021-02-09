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
      saveMessage: {
        messages: defineMessages({
          label: {
            id: 'column.audit.default.termDisplayName',
            defaultMessage: 'Save message',
          },
        }),
        order: 20,
        sortBy: 'audits_common:saveMessage',
        width: 250,
        
        // newValue
        // Reason
      },
      originalValue: {
        messages: defineMessages({
          label: {
            id: 'column.audit.default.originalValue',
            defaultMessage: 'Original value',
          },
        }),
        order: 30,
        sortBy: 'audits_common:fieldChangedGroupList/0/originalValue',
        width: 250,
      },
      newValue: {
        messages: defineMessages({
          label: {
            id: 'column.audit.default newValue',
            defaultMessage: 'Original value',
          },
        }),
        order: 30,
        sortBy: 'audits_common:fieldChangedGroupList/0  newValue',
        width: 250,
      },
      changeReason: {
        messages: defineMessages({
          label: {
            id: 'column.audit.default changeReason',
            defaultMessage: 'Original value',
          },
        }),
        order: 40,
        sortBy: 'audits_common:fieldChangedGroupList/0  changeReason',
        width: 250,
      },
    },
  };
};
