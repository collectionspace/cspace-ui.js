import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, intlShape } from 'react-intl';
import Immutable from 'immutable';
import { components as inputComponents } from 'cspace-input';
import { getSearchableRecordTypes } from '../../helpers/searchHelpers';

const { QuickSearchInput } = inputComponents;

const messages = defineMessages({
  placeholder: {
    id: 'quickSearchForm.placeholder',
    description: 'The placeholder text to display in the quick search input.',
    defaultMessage: 'Search',
  },
  search: {
    id: 'quickSearchForm.search',
    description: 'The label of the search button in the quick search input.',
    defaultMessage: 'Search',
  },
  keywordInputLabel: {
    id: 'quickSearchForm.keywordInputLabel',
    description: 'The accessible label of the keyword field in the quick search input.',
    defaultMessage: 'Search keywords',
  },
  recordTypeInputLabel: {
    id: 'quickSearchForm.recordTypeInputLabel',
    description: 'The accessible label of the record type dropdown in the quick search input.',
    defaultMessage: 'Record type to search',
  },
  vocabularyInputLabel: {
    id: 'quickSearchForm.vocabularyInputLabel',
    description: 'The accessible label of the vocabulary dropdown in the quick search input.',
    defaultMessage: 'Vocabulary to search',
  },
});

const propTypes = {
  intl: intlShape,
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }),
  perms: PropTypes.instanceOf(Immutable.Map),
  getAuthorityVocabCsid: PropTypes.func,
};

export default function QuickSearchForm(props) {
  const {
    intl,
    config,
    perms,
    getAuthorityVocabCsid,
    ...remainingProps
  } = props;

  const formatRecordTypeLabel = (name, recordTypeConfig) => (
    intl.formatMessage(recordTypeConfig.messages.record.collectionName)
  );

  const formatVocabularyLabel = (name, vocabularyConfig) => (
    intl.formatMessage(vocabularyConfig.messages.name)
  );

  return (
    <fieldset>
      <QuickSearchInput
        {...remainingProps}
        formatRecordTypeLabel={formatRecordTypeLabel}
        formatVocabularyLabel={formatVocabularyLabel}
        keywordInputLabel={intl.formatMessage(messages.keywordInputLabel)}
        placeholder={intl.formatMessage(messages.placeholder)}
        recordTypeInputLabel={intl.formatMessage(messages.recordTypeInputLabel)}
        recordTypes={getSearchableRecordTypes(getAuthorityVocabCsid, config, perms)}
        searchButtonLabel={intl.formatMessage(messages.search)}
        vocabularyInputLabel={intl.formatMessage(messages.vocabularyInputLabel)}
      />
    </fieldset>
  );
}

QuickSearchForm.propTypes = propTypes;
