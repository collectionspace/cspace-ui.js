import { defineMessages } from 'react-intl';

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
