import { defineMessages } from 'react-intl';

// FIXME: Plugins shouldn't have to import react-intl, since this unnecessarily increases the size
// when built as a standalone package. Instead, defineMessages should be supplied in the
// pluginContext. But this means that messages won't be extracted by the Babel plugin, since it
// only operates on files that import react-intl.

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
