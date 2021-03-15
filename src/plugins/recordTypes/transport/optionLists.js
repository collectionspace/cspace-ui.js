import { defineMessages } from 'react-intl';

export default {
  transportMethodType: {
    values: [
      'cargo aircraft',
      'combi aircraft',
      'common carrier',
      'exclusive-use truck',
      'expedited use freight',
      'LOFO freight',
      'mail',
      'non-commercial carrier',
      'ocean freight',
      'passenger aircraft',
      'shuttle service',
    ],
    messages: defineMessages({
      'Cargo aircraft': {
        id: 'option.transportMethodType.Cargo aircraft',
        defaultMessage: 'cargo aircraft',
      },
      'Combi aircraft': {
        id: 'option.transportMethodType.Combi aircraft',
        defaultMessage: 'combi aircraft',
      },
      'Common carrier': {
        id: 'option.transportMethodType.Common carrier',
        defaultMessage: 'common carrier',
      },
      'Exclusive-use truck': {
        id: 'option.transportMethodType.Exclusive-use truck',
        defaultMessage: 'exclusive-use truck',
      },
      'Expedited use freight': {
        id: 'option.transportMethodType.Expedited use freight',
        defaultMessage: 'expedited use freight',
      },
      'LOFO freight': {
        id: 'option.transportMethodType.LOFO freight',
        defaultMessage: 'LOFO freight',
      },
      Mail: {
        id: 'option.transportMethodType.Mail',
        defaultMessage: 'mail',
      },
      'Non-commercial carrier': {
        id: 'option.transportMethodType.Non-commercial carrier',
        defaultMessage: 'non-commercial carrier',
      },
      'Ocean freight': {
        id: 'option.transportMethodType.Ocean freight',
        defaultMessage: 'ocean freight',
      },
      'Passenger aircraft': {
        id: 'option.transportMethodType.Passenger aircraft',
        defaultMessage: 'passenger aircraft',
      },
      'Shuttle service': {
        id: 'option.transportMethodType.Shuttle service',
        defaultMessage: 'shuttle service',
      },
    }),
  },
};
