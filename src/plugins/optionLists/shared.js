import { defineMessages } from 'react-intl';

/**
 * This plugin provides option lists that are shared by multiple record types. Option lists that
 * are used by only one record type are defined in the plugin for that record type.
 */
export default () => ({
  optionLists: {
    searchResultPagePageSizes: {
      values: [
        '20',
        '40',
        '100',
      ],
    },
    searchPanelPageSizes: {
      values: [
        '5',
        '10',
        '20',
      ],
    },
    booleans: {
      values: [
        'true',
        'false',
      ],
      messages: defineMessages({
        true: {
          id: 'option.booleans.true',
          defaultMessage: 'yes',
        },
        false: {
          id: 'option.booleans.false',
          defaultMessage: 'no',
        },
      }),
    },
    yesNoValues: {
      values: [
        'yes',
        'no',
      ],
      messages: defineMessages({
        yes: {
          id: 'option.yesNoValues.yes',
          defaultMessage: 'yes',
        },
        no: {
          id: 'option.yesNoValues.no',
          defaultMessage: 'no',
        },
      }),
    },
    dateQualifiers: {
      values: [
        '+/-',
        '+',
        '-',
      ],
      messages: defineMessages({
        '+/-': {
          id: 'option.dateQualifiers.+/-',
          defaultMessage: '+/-',
        },
        '+': {
          id: 'option.dateQualifiers.+',
          defaultMessage: '+',
        },
        '-': {
          id: 'option.dateQualifiers.-',
          defaultMessage: '-',
        },
      }),
    },
    departments: {
      values: [
        'antiquities',
        'architecture-design',
        'decorative-arts',
        'ethnography',
        'herpetology',
        'media-performance-art',
        'paintings-sculpture',
        'paleobotany',
        'photographs',
        'prints-drawings',
      ],
      // I think department names are proper nouns? Capitalizing them.
      messages: defineMessages({
        antiquities: {
          id: 'option.departments.antiquities',
          defaultMessage: 'Antiquities',
        },
        'architecture-design': {
          id: 'option.departments.architecture-design',
          defaultMessage: 'Architecture and Design',
        },
        'decorative-arts': {
          id: 'option.departments.decorative-arts',
          defaultMessage: 'Decorative Arts',
        },
        ethnography: {
          id: 'option.departments.ethnography',
          defaultMessage: 'Ethnography',
        },
        herpetology: {
          id: 'option.departments.herpetology',
          defaultMessage: 'Herpetology',
        },
        'media-performance-art': {
          id: 'option.departments.media-performance-art',
          defaultMessage: 'Media and Performance Art',
        },
        'paintings-sculpture': {
          id: 'option.departments.paintings-sculpture',
          defaultMessage: 'Paintings and Sculpture',
        },
        paleobotany: {
          id: 'option.departments.paleobotany',
          defaultMessage: 'Paleobotany',
        },
        photographs: {
          id: 'option.departments.photographs',
          defaultMessage: 'Photographs',
        },
        'prints-drawings': {
          id: 'option.departments.prints-drawings',
          defaultMessage: 'Prints and Drawings',
        },
      }),
    },
    loanPurposes: {
      values: [
        'exhibition',
        'research',
        'scientificorexhibitpreparation',
        'analysis',
        'photography',
        'conservationotherrequestedservices',
        'longtermcollectionsmanagementandstorage',
      ],
      messages: defineMessages({
        exhibition: {
          id: 'option.loanPurposes.exhibition',
          defaultMessage: 'exhibition',
        },
        research: {
          id: 'option.loanPurposes.research',
          defaultMessage: 'research',
        },
        scientificorexhibitpreparation: {
          id: 'option.loanPurposes.scientificorexhibitpreparation',
          defaultMessage: 'scientific or exhibit preparation',
        },
        analysis: {
          id: 'option.loanPurposes.analysis',
          defaultMessage: 'analysis',
        },
        photography: {
          id: 'option.loanPurposes.photography',
          defaultMessage: 'photography',
        },
        conservationotherrequestedservices: {
          id: 'option.loanPurposes.conservationotherrequestedservices',
          defaultMessage: 'conservation or other requested services',
        },
        longtermcollectionsmanagementandstorage: {
          id: 'option.loanPurposes.longtermcollectionsmanagementandstorage',
          defaultMessage: 'long-term collections management and storage',
        },
      }),
    },
  },
});
