import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    formatTimestamp,
  } = configContext.formatHelpers;

  return {
    default: {
      iterationIdentificationNumber: {
        messages: defineMessages({
          label: {
            id: 'column.iterationreport.default.iterationIdentificationNumber',
            defaultMessage: 'Identification number',
          },
        }),
        order: 10,
        sortBy: 'iterationreports_common:iterationIdentificationNumber',
        width: 200,
      },
      updatedAt: {
        formatValue: formatTimestamp,
        messages: defineMessages({
          label: {
            id: 'column.iterationreport.default.updatedAt',
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
