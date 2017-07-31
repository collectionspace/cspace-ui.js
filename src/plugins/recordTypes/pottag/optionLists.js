import { defineMessages } from 'react-intl';

// FIXME: Plugins shouldn't have to import react-intl, since this unnecessarily increases the size
// when built as a standalone package. Instead, defineMessages should be supplied in the
// pluginContext. But this means that messages won't be extracted by the Babel plugin, since it
// only operates on files that import react-intl.

export default {
  exitReason: {
    values: [
      'deaccession',
      'disposal',
      'return-of-loan',
    ],
    messages: defineMessages({
      deaccession: {
        id: 'option.exitReason.deaccession',
        defaultMessage: 'deaccession',
      },
      disposal: {
        id: 'option.exitReason.disposal',
        defaultMessage: 'disposal',
      },
      'return-of-loan': {
        id: 'option.exitReason.return-of-loan',
        defaultMessage: 'return of loan',
      },
    }),
  },
  exitMethod: {
    values: [
      'courier',
      'in-person',
      'post',
    ],
    messages: defineMessages({
      courier: {
        id: 'option.exitMethod.courier',
        defaultMessage: 'courier',
      },
      'in-person': {
        id: 'option.exitMethod.in-person',
        defaultMessage: 'in person',
      },
      post: {
        id: 'option.exitMethod.post',
        defaultMessage: 'post',
      },
    }),
  },
};
