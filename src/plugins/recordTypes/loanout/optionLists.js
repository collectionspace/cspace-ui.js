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
        defaultMessage: 'conservation of other requested services',
      },
      longtermcollectionsmanagementandstorage: {
        id: 'option.loanPurposes.longtermcollectionsmanagementandstorage',
        defaultMessage: 'long-term collections management and storage',
      },
    }),
  },
};
