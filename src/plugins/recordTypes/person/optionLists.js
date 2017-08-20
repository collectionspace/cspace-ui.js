import { defineMessages } from 'react-intl';

// FIXME: Plugins shouldn't have to import react-intl, since this unnecessarily increases the size
// when built as a standalone package. Instead, defineMessages should be supplied in the
// pluginContext. But this means that messages won't be extracted by the Babel plugin, since it
// only operates on files that import react-intl.

export default {
  personTermStatus: {
    values: [
      'provisional',
      'under review',
      'accepted',
      'rejected',
    ],
    messages: defineMessages({
      provisional: {
        id: 'option.personTermStatus.provisional',
        defaultMessage: 'provisional',
      },
      'under review': {
        id: 'option.personTermStatus.under review',
        defaultMessage: 'under review',
      },
      accepted: {
        id: 'option.personTermStatus.accepted',
        defaultMessage: 'accepted',
      },
      rejected: {
        id: 'option.personTermStatus.rejected',
        defaultMessage: 'rejected',
      },
    }),
  },
  salutation: {
    values: [
      'dear',
      'hello',
      'to',
    ],
    messages: defineMessages({
      dear: {
        id: 'option.salutation.dear',
        defaultMessage: 'Dear',
      },
      hello: {
        id: 'option.salutation.hello',
        defaultMessage: 'Hello',
      },
      to: {
        id: 'option.salutation.to',
        defaultMessage: 'To',
      },
    }),
  },
  personTitle: {
    values: [
      'Mr',
      'Mrs',
      'Ms',
      'Miss',
      'Dr',
      'Professor',
      'Sir',
      'Dame',
      'Baron',
      'Baroness',
      'Lord',
      'Lady',
    ],
    messages: defineMessages({
      Mr: {
        id: 'option.personTitle.Mr',
        defaultMessage: 'Mr',
      },
      Mrs: {
        id: 'option.personTitle.Mrs',
        defaultMessage: 'Mrs',
      },
      Ms: {
        id: 'option.personTitle.Ms',
        defaultMessage: 'Ms',
      },
      Miss: {
        id: 'option.personTitle.Miss',
        defaultMessage: 'Miss',
      },
      Dr: {
        id: 'option.personTitle.Dr',
        defaultMessage: 'Dr',
      },
      Professor: {
        id: 'option.personTitle.Professor',
        defaultMessage: 'Professor',
      },
      Sir: {
        id: 'option.personTitle.Sir',
        defaultMessage: 'Sir',
      },
      Dame: {
        id: 'option.personTitle.Dame',
        defaultMessage: 'Dame',
      },
      Baron: {
        id: 'option.personTitle.Baron',
        defaultMessage: 'Baron',
      },
      Baroness: {
        id: 'option.personTitle.Baroness',
        defaultMessage: 'Baroness',
      },
      Lord: {
        id: 'option.personTitle.Lord',
        defaultMessage: 'Lord',
      },
      Lady: {
        id: 'option.personTitle.Lady',
        defaultMessage: 'Lady',
      },
    }),
  },
  gender: {
    values: [
      'male',
      'female',
    ],
    messages: defineMessages({
      dear: {
        id: 'option.gender.male',
        defaultMessage: 'male',
      },
      hello: {
        id: 'option.gender.female',
        defaultMessage: 'female',
      },
    }),
  },
};
