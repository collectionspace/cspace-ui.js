import { defineMessages } from 'react-intl';

export default {
  acquisitionMethods: {
    values: [
      'gift',
      'purchase',
      'exchange',
      'transfer',
      'treasure',
    ],
    messages: defineMessages({
      gift: {
        id: 'option.acquisitionMethods.gift',
        defaultMessage: 'gift',
      },
      purchase: {
        id: 'option.acquisitionMethods.purchase',
        defaultMessage: 'purchase',
      },
      exchange: {
        id: 'option.acquisitionMethods.exchange',
        defaultMessage: 'exchange',
      },
      transfer: {
        id: 'option.acquisitionMethods.transfer',
        defaultMessage: 'transfer',
      },
      treasure: {
        id: 'option.acquisitionMethods.treasure',
        defaultMessage: 'treasure',
      },
    }),
  },
};
