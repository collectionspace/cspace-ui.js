import { defineMessages } from 'react-intl';

// FIXME: Plugins shouldn't have to import react-intl, since this unnecessarily increases the size
// when built as a standalone package. Instead, defineMessages should be supplied in the
// pluginContext. But this means that messages won't be extracted by the Babel plugin, since it
// only operates on files that import react-intl.

export default {
  taxonTermTypes: {
    values: [
      'descriptor',
      'alternate descriptor',
      'used for term',
    ],
    messages: defineMessages({
      descriptor: {
        id: 'option.taxonTermTypes.descriptor',
        defaultMessage: 'descriptor',
      },
      'alternate descriptor': {
        id: 'option.taxonTermTypes.alternate descriptor',
        defaultMessage: 'alternate descriptor',
      },
      'used for term': {
        id: 'option.taxonTermTypes.used for term',
        defaultMessage: 'used for term',
      },
    }),
  },
  taxonTermStatuses: {
    values: [
      'provisional',
      'under review',
      'accepted',
      'rejected',
    ],
    messages: defineMessages({
      provisional: {
        id: 'option.taxonTermStatuses.provisional',
        defaultMessage: 'provisional',
      },
      'under review': {
        id: 'option.taxonTermStatuses.under review',
        defaultMessage: 'under review',
      },
      accepted: {
        id: 'option.taxonTermStatuses.accepted',
        defaultMessage: 'accepted',
      },
      rejected: {
        id: 'option.taxonTermStatuses.rejected',
        defaultMessage: 'rejected',
      },
    }),
  },
  taxonomicStatuses: {
    values: [
      'valid',
      'invalid',
      'accepted',
      'misapplied name',
    ],
    messages: defineMessages({
      valid: {
        id: 'option.taxonomicStatuses.valid',
        defaultMessage: 'valid',
      },
      invalid: {
        id: 'option.taxonomicStatuses.invalid',
        defaultMessage: 'invalid',
      },
      accepted: {
        id: 'option.taxonomicStatuses.accepted',
        defaultMessage: 'accepted',
      },
      'misapplied name': {
        id: 'option.taxonomicStatuses.misapplied name',
        defaultMessage: 'misapplied name',
      },
    }),
  },
  taxonRanks: {
    values: [
      'domain',
      'kingdom',
      'phylum',
      'division',
      'family',
      'class',
      'order',
      'genus',
      'species',
    ],
    messages: defineMessages({
      domain: {
        id: 'option.taxonRanks.domain',
        defaultMessage: 'domain',
      },
      kingdom: {
        id: 'option.taxonRanks.kingdom',
        defaultMessage: 'kingdom',
      },
      phylum: {
        id: 'option.taxonRanks.phylum',
        defaultMessage: 'phylum',
      },
      division: {
        id: 'option.taxonRanks.division',
        defaultMessage: 'division',
      },
      family: {
        id: 'option.taxonRanks.family',
        defaultMessage: 'family',
      },
      class: {
        id: 'option.taxonRanks.class',
        defaultMessage: 'class',
      },
      order: {
        id: 'option.taxonRanks.order',
        defaultMessage: 'order',
      },
      genus: {
        id: 'option.taxonRanks.genus',
        defaultMessage: 'genus',
      },
      species: {
        id: 'option.taxonRanks.species',
        defaultMessage: 'species',
      },
    }),
  },
  taxonCurrencies: {
    values: [
      'current',
      'obsolete',
      'archaic',
    ],
    messages: defineMessages({
      current: {
        id: 'option.taxonCurrencies.current',
        defaultMessage: 'current',
      },
      obsolete: {
        id: 'option.taxonCurrencies.obsolete',
        defaultMessage: 'obsolete',
      },
      archaic: {
        id: 'option.taxonCurrencies.archaic',
        defaultMessage: 'archaic',
      },
    }),
  },
  taxonAuthorTypes: {
    values: [
      'ascribed',
      'parenthetical',
    ],
    messages: defineMessages({
      ascribed: {
        id: 'option.taxonAuthorTypes.ascribed',
        defaultMessage: 'ascribed',
      },
      parenthetical: {
        id: 'option.taxonAuthorTypes.parenthetical',
        defaultMessage: 'parenthetical',
      },
    }),
  },
};
