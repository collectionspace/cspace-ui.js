import { defineMessages } from 'react-intl';

// FIXME: Plugins shouldn't have to import react-intl, since this unnecessarily increases the size
// when built as a standalone package. Instead, defineMessages should be supplied in the
// pluginContext. But this means that messages won't be extracted by the Babel plugin, since it
// only operates on files that import react-intl.

export default {
  termType: {
    values: [
      'descriptor',
      'alternate-descriptor',
      'native',
      'non-native',
      'local',
      'descriptive',
      'spelling-variant',
    ],
    messages: defineMessages({
      descriptor: {
        id: 'option.termType.descriptor',
        defaultMessage: 'Descriptor',
      },
      'alternate-descriptor': {
        id: 'option.termType.alternate-descriptor',
        defaultMessage: 'Alternate Descriptor',
      },
      'used-for-term': {
        id: 'option.termType.used-for-term',
        defaultMessage: 'Used for Term',
      },
    }),
  },
  termStatus: {
    values: [
      'provisional',
      'under-review',
      'accepted',
      'rejected',
    ],
    messages: defineMessages({
      provisional: {
        id: 'option.termStatus.provisional',
        defaultMessage: 'Provisional',
      },
      'under-review': {
        id: 'option.termStatus.under-review',
        defaultMessage: 'Under Review',
      },
      accepted: {
        id: 'option.termStatus.accepted',
        defaultMessage: 'Accepted',
      },
      rejected: {
        id: 'option.termStatus.rejected',
        defaultMessage: 'Rejected',
      },
    }),
  },
  taxonomicStatus: {
    values: [
      'valid',
      'invalid',
      'accepted',
      'misapplied-name',
    ],
    messages: defineMessages({
      valid: {
        id: 'option.taxonomicStatus.valid',
        defaultMessage: 'Valid',
      },
      invalid: {
        id: 'option.taxonomicStatus.invalid',
        defaultMessage: 'Invalid',
      },
      accepted: {
        id: 'option.taxonomicStatus.accepted',
        defaultMessage: 'Accepted',
      },
      'misapplied-name': {
        id: 'option.taxonomicStatus.misapplied-name',
        defaultMessage: 'Misapplied Name',
      },
    }),
  },
  taxonRank: {
    values: [
      'domain',
      'kingdom',
      'phylum',
      'division',
      'family',
      'clazz',
      'order',
      'genus',
      'species',
    ],
    messages: defineMessages({
      domain: {
        id: 'option.taxonRank.domain',
        defaultMessage: 'Domain',
      },
      kingdom: {
        id: 'option.taxonRank.kingdom',
        defaultMessage: 'Kingdom',
      },
      phylum: {
        id: 'option.taxonRank.phylum',
        defaultMessage: 'Phylum',
      },
      division: {
        id: 'option.taxonRank.division',
        defaultMessage: 'Division',
      },
      family: {
        id: 'option.taxonRank.family',
        defaultMessage: 'Family',
      },
      clazz: {
        id: 'option.taxonRank.clazz',
        defaultMessage: 'Class',
      },
      order: {
        id: 'option.taxonRank.order',
        defaultMessage: 'order',
      },
      genus: {
        id: 'option.taxonRank.genus',
        defaultMessage: 'Genus',
      },
      species: {
        id: 'option.taxonRank.species',
        defaultMessage: 'Species',
      },
    }),
  },
  taxonCurrency: {
    values: [
      'current',
      'obsolete',
      'archaic',
    ],
    messages: defineMessages({
      current: {
        id: 'option.taxonCurrency.current',
        defaultMessage: 'Current',
      },
      obsolete: {
        id: 'option.taxonCurrency.obsolete',
        defaultMessage: 'Obsolete',
      },
      archaic: {
        id: 'option.taxonCurrency.archaic',
        defaultMessage: 'Archaic',
      },
    }),
  },
  taxonAuthorType: {
    values: [
      'ascribed',
      'parenthetical',
    ],
    messages: defineMessages({
      ascribed: {
        id: 'option.taxonAuthorType.ascribed',
        defaultMessage: 'Ascribed',
      },
      parenthetical: {
        id: 'option.taxonAuthorType.parenthetical',
        defaultMessage: 'Parenthetical',
      },
    }),
  },
};
