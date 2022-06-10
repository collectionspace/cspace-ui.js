import { defineMessages } from 'react-intl';

export default {
  installationType: {
    values: [
      'installation',
      'deinstallation',
      'exhibition update',
    ],
    messages: defineMessages({
      installation: {
        id: 'option.installationType.installation',
        defaultMessage: 'installation',
      },
      deinstallation: {
        id: 'option.installationType.deinstallation',
        defaultMessage: 'deinstallation',
      },
      'exhibition update': {
        id: 'option.installationType.exhibition update',
        defaultMessage: 'exhibition update',
      },
    }),
  },
  iterationSuccess: {
    values: [
      'yes',
      'no',
      'partially',
    ],
    messages: defineMessages({
      yes: {
        id: 'option.iterationSuccess.yes',
        defaultMessage: 'yes',
      },
      no: {
        id: 'option.iterationSuccess.no',
        defaultMessage: 'no',
      },
      partially: {
        id: 'option.iterationSuccess.partially',
        defaultMessage: 'partially',
      },
    }),
  },
};
