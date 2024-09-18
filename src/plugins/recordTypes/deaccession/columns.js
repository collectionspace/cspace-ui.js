import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    formatRefName,
    formatTimestamp,
  } = configContext.formatHelpers;

  return {
    default: {
      deaccessionNumber: {
        messages: defineMessages({
          label: {
            id: 'column.deaccession.default.deaccessionNumber',
            defaultMessage: 'Deaccession number',
          },
        }),
        order: 10,
        sortBy: 'deaccessions_common:deaccessionNumber',
        width: 200,
      },
      deaccessionApprovalIndividual: {
        formatValue: formatRefName,
        messages: defineMessages({
          label: {
            id: 'column.deaccession.default.deaccessionApprovalIndividual',
            defaultMessage: 'Individual',
          },
        }),
        order: 20,
        sortBy: 'deaccessions_common:deaccessionApprovalGroupList/0/deaccessionApprovalIndividual',
        width: 450,
      },
      updatedAt: {
        formatValue: formatTimestamp,
        messages: defineMessages({
          label: {
            id: 'column.deaccession.default.updatedAt',
            defaultMessage: 'Updated',
          },
        }),
        order: 30,
        sortBy: 'collectionspace_core:updatedAt',
        width: 150,
      },
    },
  };
};
