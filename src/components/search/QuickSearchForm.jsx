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
        placeholder={intl.formatMessage(messages.placeholder)}
        recordTypes={getSearchableRecordTypes(getAuthorityVocabCsid, config, perms)}
        searchButtonLabel={intl.formatMessage(messages.search)}
      />
    </fieldset>
  );
}

QuickSearchForm.propTypes = propTypes;
