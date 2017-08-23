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
      'returnofloan',
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
      returnofloan: {
        id: 'option.exitReasons.returnofloan',
        defaultMessage: 'return of loan',
      },
    }),
  },
  exitMethods: {
    values: [
      'courier',
      'inperson',
      'post',
    ],
    messages: defineMessages({
      courier: {
        id: 'option.exitMethods.courier',
        defaultMessage: 'courier',
      },
      inperson: {
        id: 'option.exitMethods.inperson',
        defaultMessage: 'in person',
      },
      post: {
        id: 'option.exitMethods.post',
        defaultMessage: 'post',
      },
    }),
  },
};
