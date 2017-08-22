import { defineMessages } from 'react-intl';

// FIXME: Plugins shouldn't have to import react-intl, since this unnecessarily increases the size
// when built as a standalone package. Instead, defineMessages should be supplied in the
// pluginContext. But this means that messages won't be extracted by the Babel plugin, since it
// only operates on files that import react-intl.

export default {
  exitReasons: {
    values: [
      'deaccession',
      'disposal',
      'return-of-loan',
    ],
    messages: defineMessages({
      deaccession: {
        id: 'option.exitReasons.deaccession',
        defaultMessage: 'deaccession',
      },
      disposal: {
        id: 'option.exitReasons.disposal',
        defaultMessage: 'disposal',
      },
      'return-of-loan': {
        id: 'option.exitReasons.return-of-loan',
        defaultMessage: 'return of loan',
      },
    }),
  },
  exitMethods: {
    values: [
      'courier',
      'in-person',
      'post',
    ],
    messages: defineMessages({
      courier: {
        id: 'option.exitMethods.courier',
        defaultMessage: 'courier',
      },
      'in-person': {
        id: 'option.exitMethods.in-person',
        defaultMessage: 'in person',
      },
      post: {
        id: 'option.exitMethods.post',
        defaultMessage: 'post',
      },
    }),
  },
};
