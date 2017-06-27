import { defineMessages } from 'react-intl';

// FIXME: Plugins shouldn't have to import react-intl, since this unnecessarily increases the size
// when built as a standalone package. Instead, defineMessages should be supplied in the
// pluginContext. But this means that messages won't be extracted by the Babel plugin, since it
// only operates on files that import react-intl.

export default {
  acquisitionMethod: {
    values: [
      'gift',
      'purchase',
      'exchange',
      'transfer',
      'treasure',
    ],
    messages: defineMessages({
      gift: {
        id: 'option.acquisitionMethod.gift',
        defaultMessage: 'gift',
      },
      purchase: {
        id: 'option.acquisitionMethod.purchase',
        defaultMessage: 'purchase',
      },
      exchange: {
        id: 'option.acquisitionMethod.exchange',
        defaultMessage: 'exchange',
      },
      transfer: {
        id: 'option.acquisitionMethod.transfer',
        defaultMessage: 'transfer',
      },
      treasure: {
        id: 'option.acquisitionMethod.treasure',
        defaultMessage: 'treasure',
      },
    }),
  },
};
