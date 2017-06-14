import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, intlShape } from 'react-intl';
import { components as inputComponents } from 'cspace-input';

const { QuickSearchInput } = inputComponents;

const messages = defineMessages({
  quickSearchPlaceholder: {
    id: 'quickSearchForm.placeholder',
    description: 'The placeholder text to display in the quick search input.',
    defaultMessage: 'Search',
  },
});

const propTypes = {
  intl: intlShape,
  config: PropTypes.object,
};

export default function QuickSearchForm(props) {
  const {
    intl,
    config,
    ...remainingProps
  } = props;

  const formatRecordTypeLabel = (name, recordTypeConfig) =>
    intl.formatMessage(recordTypeConfig.messages.record.collectionName);

  const formatVocabularyLabel = (name, vocabularyConfig) =>
    intl.formatMessage(vocabularyConfig.messages.name);

  return (
    <fieldset>
      <QuickSearchInput
        {...remainingProps}
        formatRecordTypeLabel={formatRecordTypeLabel}
        formatVocabularyLabel={formatVocabularyLabel}
        placeholder={intl.formatMessage(messages.quickSearchPlaceholder)}
        recordTypes={config.recordTypes}
      />
    </fieldset>
  );
}

QuickSearchForm.propTypes = propTypes;
