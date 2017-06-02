import { defineMessages } from 'react-intl';

// FIXME: Plugins shouldn't have to import react-intl, since this unnecessarily increases the size
// when built as a standalone package. Instead, defineMessages should be supplied in the
// pluginContext. But this means that messages won't be extracted by the Babel plugin, since it
// only operates on files that import react-intl.

export default {
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
        defaultMessage: 'Exhibition',
      },
      research: {
        id: 'option.loanPurposes.research',
        defaultMessage: 'Research',
      },
      scientificorexhibitpreparation: {
        id: 'option.loanPurposes.scientificorexhibitpreparation',
        defaultMessage: 'Scientific or exhibit preparation',
      },
      analysis: {
        id: 'option.loanPurposes.analysis',
        defaultMessage: 'Analysis',
      },
      photography: {
        id: 'option.loanPurposes.photography',
        defaultMessage: 'Photography',
      },
      conservationotherrequestedservices: {
        id: 'option.loanPurposes.conservationotherrequestedservices',
        defaultMessage: 'Conservation of other requested services',
      },
      longtermcollectionsmanagementandstorage: {
        id: 'option.loanPurposes.longtermcollectionsmanagementandstorage',
        defaultMessage: 'Long-term collections management and storage',
      },
    }),
  },
};
