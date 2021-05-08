import { defineMessages } from 'react-intl';

export default (configContext) => {
  const {
    formatRefName,
    formatTimestamp,
  } = configContext.formatHelpers;

  return {
    default: {
      insuranceIndemnityReferenceNumber: {
        messages: defineMessages({
          label: {
            id: 'column.insurance.default.insuranceIndemnityReferenceNumber',
            defaultMessage: 'Insurance/Indemnity reference number',
          },
        }),
        order: 10,
        sortBy: 'insurances_common:insuranceIndemnityReferenceNumber',
        width: 200,
      },
      insurerIndemnifier: {
        formatValue: formatRefName,
        messages: defineMessages({
          label: {
            id: 'column.insurance.default.insurerIndemnifier',
            defaultMessage: 'Insurer/Indemnifier',
          },
        }),
        order: 20,
        sortBy: 'insurances_common:insurerIndemnifier',
        width: 400,
      },
      updatedAt: {
        formatValue: formatTimestamp,
        messages: defineMessages({
          label: {
            id: 'column.insurance.default.updatedAt',
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
