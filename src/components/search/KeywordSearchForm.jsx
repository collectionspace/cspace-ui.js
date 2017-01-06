import React, { PropTypes } from 'react';
import { defineMessages, intlShape } from 'react-intl';
import { components as inputComponents } from 'cspace-input';

const { KeywordSearchInput } = inputComponents;

const messages = defineMessages({
  keywordSearchPlaceholder: {
    id: 'keywordSearchForm.placeholder',
    description: 'The placeholder text to display in the keyword search input.',
    defaultMessage: 'Search...',
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

  return (
    <fieldset>
      <KeywordSearchInput
        {...remainingProps}
        placeholder={intl.formatMessage(messages.keywordSearchPlaceholder)}
        recordTypes={config.recordTypes}
      />
    </fieldset>
  );
}

KeywordSearchForm.propTypes = propTypes;
