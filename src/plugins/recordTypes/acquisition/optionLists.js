import { defineMessages } from 'react-intl';

export default {
  acquisitionMethods: {
    values: [
      'bequest',
      'commission',
      'found in collection',
      'gift',
      'purchase',
      'exchange',
      'transfer',
      'treasure',
      'unknown',
    ],
    messages: defineMessages({
      bequest: {
        id: 'option.acquisitionMethods.bequest',
        defaultMessage: 'bequest',
      },
      commission: {
        id: 'option.acquisitionMethods.commission',
        defaultMessage: 'commission',
      },
      'found in collection': {
        id: 'option.acquisitionMethods.found in collection',
        defaultMessage: 'found in collection',
      },
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
      unknown: {
        id: 'option.acquisitionMethods.unknown',
        defaultMessage: 'unknown',
      },
    }),
  },
};
