import React, { PropTypes } from 'react';
import { defineMessages, intlShape } from 'react-intl';
import { components as inputComponents } from 'cspace-input';

const { KeywordSearchInput } = inputComponents;

const messages = defineMessages({
  keywordSearchPlaceholder: {
    id: 'keywordSearchForm.placeholder',
    description: 'The placeholder text to display in the keyword search input.',
    defaultMessage: 'Search keywords',
  },
});

const propTypes = {
  intl: intlShape,
  config: PropTypes.object,
};

export default function KeywordSearchForm(props) {
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
      <KeywordSearchInput
        {...remainingProps}
        formatRecordTypeLabel={formatRecordTypeLabel}
        formatVocabularyLabel={formatVocabularyLabel}
        placeholder={intl.formatMessage(messages.keywordSearchPlaceholder)}
        recordTypes={config.recordTypes}
      />
    </fieldset>
  );
}

KeywordSearchForm.propTypes = propTypes;
