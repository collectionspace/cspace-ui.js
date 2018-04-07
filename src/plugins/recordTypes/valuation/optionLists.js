import { defineMessages } from 'react-intl';

export default {
  valueTypes: {
    values: [
      'Current Value',
      'Original Value',
      'Replacement Value',
    ],
    messages: defineMessages({
      'Current Value': {
        id: 'option.valueTypes.Current Value',
        defaultMessage: 'current value',
      },
      'Original Value': {
        id: 'option.valueTypes.Original Value',
        defaultMessage: 'original value',
      },
      'Replacement Value': {
        id: 'option.valueTypes.Replacement Value',
        defaultMessage: 'replacement value',
      },
    }),
  },
};
