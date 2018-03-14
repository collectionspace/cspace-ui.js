import { defineMessages } from 'react-intl';

// FIXME: Plugins shouldn't have to import react-intl, since this unnecessarily increases the size
// when built as a standalone package. Instead, defineMessages should be supplied in the
// configContext. But this means that messages won't be extracted by the Babel plugin, since it
// only operates on files that import react-intl.

export default {
  measurementUnits: {
    values: [
      'carats',
      'centimeters',
      'cubic-centimeters',
      'feet',
      'inches',
      'kilograms',
      'liters',
      'millimeters',
      'meters',
      'minutes',
      'pixels',
      'square-feet',
      'stories',
    ],
    messages: defineMessages({
      carats: {
        id: 'option.measurementUnits.carats',
        defaultMessage: 'carats',
      },
      centimeters: {
        id: 'option.measurementUnits.centimeters',
        defaultMessage: 'centimeters',
      },
      'cubic-centimeters': {
        id: 'option.measurementUnits.cubic-centimeters',
        defaultMessage: 'cubic centimeters',
      },
      feet: {
        id: 'option.measurementUnits.feet',
        defaultMessage: 'feet',
      },
      inches: {
        id: 'option.measurementUnits.inches',
        defaultMessage: 'inches',
      },
      kilograms: {
        id: 'option.measurementUnits.kilograms',
        defaultMessage: 'kilograms',
      },
      liters: {
        id: 'option.measurementUnits.liters',
        defaultMessage: 'liters',
      },
      millimeters: {
        id: 'option.measurementUnits.millimeters',
        defaultMessage: 'millimeters',
      },
      meters: {
        id: 'option.measurementUnits.meters',
        defaultMessage: 'meters',
      },
      minutes: {
        id: 'option.measurementUnits.minutes',
        defaultMessage: 'minutes',
      },
      pixels: {
        id: 'option.measurementUnits.pixels',
        defaultMessage: 'pixels',
      },
      'square-feet': {
        id: 'option.measurementUnits.square-feet',
        defaultMessage: 'square feet',
      },
      stories: {
        id: 'option.measurementUnits.stories',
        defaultMessage: 'stories',
      },
    }),
  },
};
